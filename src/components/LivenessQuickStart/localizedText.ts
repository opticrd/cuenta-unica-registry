import { Context } from '@/app/[lang]/provider';
import type {
  LivenessDisplayText,
  HintDisplayText,
  CameraDisplayText,
  InstructionDisplayText,
  StreamDisplayText,
  ErrorDisplayText,
} from '@aws-amplify/ui-react-liveness/dist/types/components/FaceLivenessDetector/displayText';

export const useLocalizedText = ({
  intl: {
    liveness: { hints, camera, instructions, stream, error },
  },
}: Context) =>
  ({
    ...({
      hintMoveFaceFrontOfCameraText: hints.moveFaceFrontOfCamera,
      hintTooManyFacesText: hints.tooManyFaces,
      hintFaceDetectedText: hints.faceDetected,
      hintCanNotIdentifyText: hints.canNotIdentify,
      hintTooCloseText: hints.tooClose,
      hintTooFarText: hints.tooFar,
      hintHoldFacePositionCountdownText: hints.holdFacePositionCountdown,
      hintConnectingText: hints.connecting,
      hintVerifyingText: hints.verifying,
      hintIlluminationTooBrightText: hints.illuminationTooBright,
      hintIlluminationTooDarkText: hints.illuminationTooDark,
      hintIlluminationNormalText: hints.illuminationNormal,
      hintHoldFaceForFreshnessText: hints.holdFaceForFreshness,
    } as Required<HintDisplayText>),
    ...({
      cameraMinSpecificationsHeadingText: camera.minSpecifications.heading,
      cameraMinSpecificationsMessageText: camera.minSpecifications.message,
      cameraNotFoundHeadingText: camera.notFound.heading,
      cameraNotFoundMessageText: camera.notFound.message,
      retryCameraPermissionsText: camera.permissions,
    } as Required<CameraDisplayText>),
    ...({
      instructionsHeaderHeadingText: instructions.header.heading,
      instructionsHeaderBodyText: instructions.header.body,
      instructionsBeginCheckText: instructions.begin,
      photosensitivyWarningHeadingText:
        instructions.photosensitivyWarning.heading,
      photosensitivyWarningBodyText: instructions.photosensitivyWarning.body,
      photosensitivyWarningInfoText: instructions.photosensitivyWarning.info,
      instructionListHeadingText: instructions.list.heading,
      goodFitCaptionText: instructions.goodFit.caption,
      goodFitAltText: instructions.goodFit.alt,
      tooFarCaptionText: instructions.tooFar.caption,
      tooFarAltText: instructions.tooFar.alt,
      instructionListStepOneText: instructions.list.stepOne,
      instructionListStepTwoText: instructions.list.stepTwo,
      instructionListStepThreeText: instructions.list.stepThree,
      instructionListStepFourText: instructions.list.stepFour,
    } as Required<InstructionDisplayText>),
    ...({
      recordingIndicatorText: stream.recording,
      cancelLivenessCheckText: stream.cancel,
    } as Required<StreamDisplayText>),
    ...({
      timeoutHeaderText: error.timeout.heading,
      timeoutMessageText: error.timeout.message,
      faceDistanceHeaderText: error.faceDistance.heading,
      faceDistanceMessageText: error.faceDistance.message,
      multipleFacesHeaderText: error.multipleFaces.heading,
      multipleFacesMessageText: error.multipleFaces.message,
      clientHeaderText: error.client.heading,
      clientMessageText: error.client.message,
      serverHeaderText: error.server.heading,
      serverMessageText: error.server.message,
      landscapeHeaderText: error.landscape.heading,
      landscapeMessageText: error.landscape.message,
      portraitMessageText: error.portrait,
      tryAgainText: error.tryAgain,
    } as Required<ErrorDisplayText>),
  }) as Required<LivenessDisplayText>;
