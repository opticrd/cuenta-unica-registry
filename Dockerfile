FROM node:lts-alpine as release
WORKDIR /app
COPY package.json yarn.lock ./
# install dependencies
RUN yarn install --frozen-lockfile
COPY . .
# build
RUN yarn build
# remove dev dependencies
RUN npm prune --production
FROM node:lts-alpine 
WORKDIR /app
# copy from build image
COPY --from=release /app/package.json ./package.json
COPY --from=release /app/node_modules ./node_modules
COPY --from=release /app/.next ./.next
COPY --from=release /app/public ./public

ENV PORT 8080
ENV HOST 0.0.0.0

EXPOSE ${PORT}
CMD ["yarn", "start"]