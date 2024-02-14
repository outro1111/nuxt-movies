export default defineI18nLocale(async (locale) => {
  return {
    // error
    errorText: '해당 페이지를 찾을 수 없습니다.',
    noData: '검색 결과가 없습니다.',
	
    // button
    btnGotoMain: '메인으로 이동',
    btnGotoLogin: '로그인으로 이동',
    btnSearch: '검색',
    btnLogin: '로그인',
    btnLoginInfo: '로그인 정보',
    btnLang: '언어 설정',
    btnDarkmode: '다크 모드',
    btnLightmode: '라이트 모드',
    btnReviewPost: '리뷰작성',
    btnReviewEdit: '리뷰수정',
    btnEdit: '수정',
    btnDelete: '삭제',
	
    // login
    loginText: '로그인',
    emailText: '이메일',
    passwordText: '패스워드',
    passwordError1: '이메일 또는 비밀번호를 잘못 입력했습니다.',
    passwordError2: '입력하신 내용을 다시 확인해주세요.',
    signUpText: '회원가입',
    signUpGuideText1: '회원이 아니시라면',
    signUpGuideText2: '을 해주세요.',
    nameText: '이름',
    nameInvalid: '이름을 2글자 이상 12글자 이하로 입력해 주세요.',
    emailInvalid: '이메일 형식에 맞게 입력하세요.',
    passwordInvalid: '6~12자 영문 숫자를 사용하세요.',
    signUpWelcome1: '님',
    signUpWelcome2: '회원가입을 환영합니다.',
    signUpWelcome3: '로그인 후 이용해주세요.',
    loginErrorGuide: '정확하지 않은 정보 혹은 이미 등록된 사용자입니다. \n다시 입력하여 가입해주세요.',
	  logoutGuide: '로그아웃 되었습니다.',

    // review
    reviewLogin: '후 리뷰를 입력해주세요.',
    reviewGuide1: '첫번째 리뷰를 남겨주세요.',
    reviewGuide2: '리뷰는 한 영화에 한번만 작성 가능합니다.',
    reviewGuide3: '감상평을 등록해주세요.',
    reviewGuide4: '삭제하시겠습니까?',
    reviewGuide5: '리뷰가 수정되었습니다.',
    reviewGuide6: '감상평을 등록해주세요.',

    // movie list
    movieListText: '영화 리스트',
    movieResultGuide1 : '에 대한 검색 결과가',
    movieResultGuide2 : '개 있습니다.',
  }
})