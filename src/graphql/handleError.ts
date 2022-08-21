export const handleError = (error) => {
    let message = error[Object.keys(error)[0]]['status'];
    switch (message) {
        case 'IMAGE_UPLOAD_FAILED':
            return 'Uploading the image failed';
        case 'INVALID_TIME_RANGE':
            return 'Invalid time range';
        case 'TIME_CONFLICT':
            return 'Time conflict';
        case 'NOT_FOUND':
            return 'Not found';
        case 'ALREADY_EXIST':
            return 'This session has already been booked';
        case 'REACHED_THE_LIMIT':
            return 'Reached the limit';
        case 'USER_NOT_FOUND':
            return 'User was not found';
        case 'AUTHENTICATION_FAILED':
            return 'Authentication failed';
        case 'USERNAME_ALREADY_EXISTS':
            return 'Username already exists';
        case 'USER_IS_NOT_INVESTOR':
            return 'User is not an investor';
        case 'USER_IS_NOT_SELLER':
            return 'User is not a seller';
        case 'USER_IS_NOT_WHOLE_SALER':
            return 'User is not a Wholesaler';
        case 'INVESTOR_IS_NOT_VERIFIED':
            return 'Investor is not verified';
        case 'ACCESS_DENIED':
            return 'Access Denied';
        case 'INVESTOR_ALREADY_IS_VERIFIED':
            return 'Investor is already verified';
        case 'PROFILE_NOT_COMPLETED':
            return 'Profile is not completed';
        case 'SUCCESS':
            return 'Operation was successful';
        case 'EVENT_DOES_NOT_EXIST':
            return 'Event does not exist';
        case 'USER_NOT_INVITED':
            return 'User has not been invited';
        case 'EVENT_NOT_STARTED':
            return "Even hasn't started yet!";
        case 'EVENT_ENDED':
            return 'Event has ended!';
        case 'EXTERNAL_EVENT_ERROR':
            return 'External event error';
        case 'USER_HAS_NOT_JOINED':
            return "User hasn't joined yet";
        case 'NON_HOST_TRIED_TO_START':
            return 'A none host user has tried to start';
        case 'NON_HOST_TRIED_TO_DELETE':
            return 'A none host user has tried to delete';
        case 'EVENT_NEEDS_AT_LEAST_ONE_HOST':
            return 'Event needs at least one host';
        case 'BAD_REQUEST':
            return 'Bad request';
        case 'USER_CREATION_FAILED':
            return 'User creation failed';
        case 'ALREADY_FOLLOWING':
            return 'Already following';
        case 'NOT_FOLLOWING':
            return 'Not folloowing';
        case 'CATEGORY_NOT_FOUND':
            return 'Category was not found';
        case 'GROUP_NEEDS_AT_LEAST_ONE_OWNER':
            return 'Group needs at least one owner';
        case 'GROUP_DOES_NOT_EXIST':
            return 'Group does not exist';
        case 'NON_OWNER_TRIED_TO_DELETE':
            return 'Non owner user tried to delete';
        case 'CAN_NOT_ASSIGNE_INFLUENCER_TO_CONTINUE_PROJECT':
            return 'Can Not Assigne Influencer To "Continue" Project';
        case 'POST_NOT_FOUND':
            return 'Post was not found';
        case 'COMMENT_NOT_FOUND':
            return 'Comment was not found';
        case 'NOT_ENOUGH_DATA':
            return 'Not enough data was provided!';
        case 'USERNOTACTIVE':
            return 'User is not active';
        case 'BRAND_NOTACTIVE':
            return 'Brand is not active';
        case 'INFLUENCER_NOT_ACTIVE':
            return 'Influencer is not active';
        case 'YOU_RECENTLY_UPLOAD_A_CONTENT':
            return 'You recently uploaded some content';
        case 'USER_IS_NOT_OPERATOR':
            return 'User is not an operator';
        case 'PROJECT_NOT_CONFIRMED':
            return 'Project has not been confirmed';
        case 'PROJECT_HAVE_ACTIVE_INFLUENCER':
            return 'Project has an active influencer';
        case 'PROJECT_DONT_HAVE_CONFIRMED_VIDEO':
            return 'Project does not have any confirmed video';
        case 'THE_PROJECT_HAS_ALREADY_BEEN_REVIEWED':
            return 'The project has already been reviewed';
        case 'PROJECT_IS_NOT_ACITVE':
            return 'Project is not active';
        case 'PROJECT_ALREADY_HAVE_OPERATOR':
            return 'Project already has an operator';
        case 'PROJECT_DONT_HAVE_ACTIVE_OPERATOR':
            return 'Project does not have any active operators';
        case 'PROJECT_DONT_HAVE_ACCEPT_VIDEO':
            return 'This project has no active videos, Please accept the video and try again';
        case 'INFLUENCER_ALREADY_ASIGNED_TO_PROJECT':
            return 'Influencer is already assigned to the project';
        case 'USER_IS_NOT_BRAND_OR_INFLUENCER':
            return 'User is not brand nor influencer';
        case 'PROJECT_ALREADY_HAVE_ACCEPTED_VIDEO':
            return 'Project already has an accepted video';
        case 'USER_NAME_IS_REQUIRED':
            return 'Username is required';
        case 'JUST_INFLUNCER_CANT_UPLOAD_CONTENT':
            return 'Content can only be uploaded by influencer';
        case 'JUST_BRAND_CANT_UPLOAD_CONTENT':
            return 'Content can only be uploaded by brand';
        case 'PROJECT_IS_CLOSED':
            return 'Project is closed';
        case 'PROJECT_COULD_NOT_BE_CLOSED':
            return 'Project could not be closed';
        case 'INVALID_PAYMENT':
            return 'Invalid payment';
        case 'NOT_SUBSCRIBED':
            return 'Not Subscribed';
        case 'SUBSCRIBED':
            return 'Subscribed';
        case 'CHARGE_SUCCEEDED':
            return 'Charge succeeded';
        case 'CHARGE_FAILED':
            return 'Charge failed';
        case 'INFLUENCER_IS_NOT_IN_ACCEPT_URL_STATUS':
            return 'Influencer is not in the accept URL status';
        case 'TARGET_AGE_SHOULD_BE_MORE_THAN18AND_LESS_THAN40':
            return 'Target age should be more than 18 and less than 40';
        case 'YOU_DONT_HAVE_STRIPE_ACCOUNT':
            return 'You do not have any stripe account';
        case 'INFLUENCER_DONT_HAVE_STRIPE_ACCOUNT':
            return 'Influencer does not have any stripe account';
        case 'YOU_DONT_HAVE_ENOUGH_BALANCE_IN_YOUR_STRIP_ACCOUNT':
            return 'You do not have enough balance in your stripe account';
        case 'INFLUENCERSHOULD_BE_IN_ACCEPTED_VIDEO_STATUS':
            return 'Influencer should be in the accepted video status';
        case 'PLATFORM_DONT_HAVE_ENOUGH_BALANCE_TO_TRANSFER_FOR_INFLUENCER':
            return 'Platform does not have enough balance to make the transaction';
        case 'CHARGING_TH_ACCOUNT_FAILED':
            return 'Chargning TH account failed';
        case 'WIDTHRAW_FROM_ACCOUNT_FAILED':
            return 'Withdraw from account failed';
        case 'THE_NUMBER_OF_ASSIGNED_INFLUENCER_FOR_THIS_PROJECT_HAS_REACHED_THE_QUORUM':
            return 'The number of assigned influencer for this project has reached the quorum';
        case 'PROJECT_DONT_HAVE_AN_ACCEPTED_VIDEO':
            return 'Project does not have an accepted video';
        default:
            return 'Operation Failed!';
    }
};

export const showError = (error) => {
    return error !== null ? error.replaceAll('_', ' ') : handleError(error);
};
