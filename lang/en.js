export default defineI18nLocale(async (locale) => {
  return {
    // error
    errorText: 'The page cannot be found.',
    noData: 'No results were found for your search.',
	
    // button
    btnGotoMain: 'Go to main',
    btnGotoLogin: 'Go to Login',
    btnSearch: 'Search',
    btnLogin: 'Login',
    btnLoginInfo: 'Login information',
    btnLang: 'Language settings',
    btnDarkmode: 'Dark Mode',
    btnLightmode: 'Light Mode',
    btnReviewPost: 'Write review',
    btnReviewEdit: 'Edit review',
    btnEdit: 'Edit',
    btnDelete: 'Delete',
	
    // login
    loginText: 'Login',
    emailText: 'Email',
    passwordText: 'Password',
    passwordError1: 'You entered your email or password incorrectly.',
    passwordError2: 'Please check the information you entered again.',
    signUpText: 'Sign up',
    signUpGuideText1: 'If you are not a member,',
    signUpGuideText2: 'please.',
    nameText: 'Name',
    nameInvalid: 'Please enter a name of at least 2 characters and no more than 12 characters.',
    emailInvalid: 'Please enter it in the correct email format.',
    passwordInvalid: 'Please use 6 to 12 alphanumeric characters.',
    signUpWelcome1: '',
    signUpWelcome2: 'Welcome to membership.',
    signUpWelcome3: 'please try again after logging in.',
    loginErrorGuide: 'Inaccurate information or you are already a registered user. \nPlease enter again to sign up.',
	  logoutGuide: 'You have been logged out.',

    // review
    reviewLogin: 'and enter a review.',
    reviewGuide1: 'Be the first to leave a review.',
    reviewGuide2: 'Reviews can only be written once per movie.',
    reviewGuide3: 'Please register your review.',
    reviewGuide4: 'Are you sure you want to delete?',
    reviewGuide5: 'The review has been updated.',
    reviewGuide6: 'Please register your review.',

    // movie list
    movieListText: 'Movie list',
    movieResultGuide1 : 'There is',
    movieResultGuide2 : 'result for your search.',
  }
})