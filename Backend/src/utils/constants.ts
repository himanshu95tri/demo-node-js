
/********* Error Code ********/
export const statusCode = {
    success: 200,
    badRequest: 400,
    serverError: 501,
    forbidden: 203,
    notFound: 204,
    notAllowed: 205,
    tokenExpired: 401,
    emailOrUserExist: 207,
    wrongPassword: 208,
    accountDeactivated: 209,
    authTokenRequired: 499,
    unauthorized: 403
};

export const message = {
    somethingWrong: "Something went wrong.",
    unauthorized: "You are not authorized to access this application, please login and try again",
    authTokenRequired: "Authentication token required.",
    invalidFileType: "Invalid file type.",
    fileSizeTooHigh: "The file size is too high.",
    contestNotExist: "Contest not exist.",
    contestRestricted: "Contest Restricted.",
    dataFetched: (val: any) => `${val} fetched successfully.`,
    dataSaved: (val: any) => `${val} saved successfully.`,
    dataRemoved: (val: any) => `${val} removed successfully.`,
    dataAdded: (val: any) => `${val} has been successfully added.`,
    dataUpdated: (val: any) => `${val} has been successfully updated.`,
    dataDeleted: (val: any) => `${val} has been successfully deleted.`,
    dataExist: (val: any) => `${val} data already exist.`,
    dataNotExist: (val: any) => `${val} data not exist.`,
}

export const projectAttributes = ['id', 'userId', 'learningObjectives', 'importantTimeStamps', 'restricted', 'materialNeededIds', 'standardsAddressedIds', 'teachingMethodsIds', 'assessmentMethodsIds', 'title', 'thumbnailUrl', 'socialThumbnailUrl', 'type', 'finalType', 'videoUrl', 'description', 'prize', 'isDemo', 'videoGame', 'esrbRating', 'subject','isMatureContent', 'ageGroup', 'isChallenge', 'quizDownloads', 'questionDownloads', 'lessonPlanDownloads', 'totalLikes', 'totalShares', 'totalDuration', 'totalFavorites', 'totalViewCount', 'totalLessonRatings', 'numLessonRatings', 'totalChallengeRatings', 'numChallengeRatings', 'totalComments', 'tags', 'platform','totalParticipants', 'challengeId', 'assessmentId', 'freeClipId', 'isChallengeRatingDisplayed', 'challengeGameName', 'isDeleted', 'endDate', 'visibility', 'premiumContent', 'isContest', 'contestType', 'createdAt', 'updatedAt']
export const projectAttributesForListing = ['id', 'userId', 'title', 'thumbnailUrl', 'socialThumbnailUrl', 'type', 'finalType', 'description', 'videoGame', 'subject','isMatureContent', 'totalLikes', 'totalShares', 'totalDuration', 'totalViewCount', 'totalLessonRatings', 'numLessonRatings', 'totalComments', 'isDeleted', 'visibility', 'createdAt', 'updatedAt']
export const courseAttributes = ['id', 'userId', 'learningObjectives', 'restricted', 'materialNeededIds', 'standardsAddressedIds', 'teachingMethodsIds', 'assessmentMethodsIds', 'title', 'thumbnailUrl', 'socialThumbnailUrl', 'description', 'videoGame', 'esrbRating', 'subject','isMatureContent', 'ageGroup', 'totalLikes', 'totalShares', 'totalDuration', 'totalFavorites', 'totalViewCount', 'totalLessonRatings', 'numLessonRatings', 'totalComments', 'tags', 'platform', 'isDeleted', 'visibility', 'premiumContent', 'createdAt', 'updatedAt']
export const courseAttributesForListing = ['id', 'userId', 'title', 'thumbnailUrl', 'socialThumbnailUrl', 'description', 'videoGame', 'subject', 'isMatureContent', 'totalLikes', 'totalShares', 'totalDuration', 'totalViewCount', 'totalLessonRatings', 'numLessonRatings', 'totalComments', 'projects', 'isDeleted', 'visibility', 'createdAt', 'updatedAt']

export const templateIds = {
    commentTemplateId : "d-1219baf5ba5645bb9db454a9b82f90b8",
    parentCommentTemplateId : "d-fd056f9568284619a90611a6d4ad7e06",
    viewsTemplateId : "d-452e53297a0843aa885e26fa665c1f69",
    likeTemplateId : "d-452e53297a0843aa885e26fa665c1f69",//need to change
    teacherVarificationTemplateId : "d-faa2df6ac7574d6391b205260e65a567",
}