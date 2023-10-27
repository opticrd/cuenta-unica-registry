import { z } from 'zod';

import { Context } from '@/app/[lang]/provider';

export const createVerificationSchema = ({ intl: { validations } }: Context) =>
  z.object({
    code: z.string().min(6, validations.code.min).max(6, validations.code.max),
  });
