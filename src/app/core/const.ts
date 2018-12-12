export const API_URLS = {
    register: 'api/register',
    login : 'api/login',
    getFamily: 'api/getfamily',
    resetpass: 'api/resetpass',
    hideDialog: 'api/hidedialog',
    createfamily: 'api/createfamily',
    updateFamily: 'api/updatefamily',
    createGroup: 'api/uploadFile',
    getListFile: 'api/getListFileUpload',
    getFileUpload: 'api/getFileUpload',
    getListKeiyaku: 'api/getListKeiyaku',
    getKeiyakuByUser: 'api/getKeiyakuByUser',
    createKeiyaku: 'api/createKeiyaku',
    updateKeiyaku: 'api/updateKeiyaku',
    deleteFile: 'api/deleteFileUpload',
    getDetailKeiyaku: 'api/getDetailKeiyaku',
    getListAgent: 'api/getListAgent',
    getListCompany: 'api/getListCompany',
    getListProduct: 'api/getListProduct',
    getListHosho: 'api/getListHosho',
    getListTokuyakuHosho: 'api/getListTokuyakuHosho',
    getListKeiyakuHosho: 'api/getListKeiyakuHosho',
    getListTokuyaku: 'api/getListTokuyaku',
    createMessage: 'api/createMessage',
    updateMessageFlag: 'api/updateMessageFlag',
    createAgent: 'api/createAgent',
    getListMessage: 'api/getListMessage',
    getKaniShindanInfo: 'api/getKaniShindanInfo',
    deleteAgent: 'api/deleteAgent',
    getInfoAgent: 'api/getInfoAgent',
    updateAgent: 'api/updateAgent',
    getListFamily: 'api/getListFamily',
    getInfoFamily: 'api/getInfoFamily',
    deleteFamily: 'api/deleteFamily',
    updateAuto: 'api/updateGroup',
    getListShokenBunseki: 'api/getListShokenBunseki',
    getFilePdf: 'api/getFilePdf',
    getSelectItem: 'api/getListSelectItem',
    changePassword: 'api/changePassword',
    getListFileRelation: 'api/getListFileRelation',
    getListBanner: 'api/getListBanner',
    getPageBanner: 'api/getPageBanner',
    createArea: 'api/createArea',
    getFileTemp: 'api/getFileImgTemp',
    editImage: 'api/editImage',
    deleteKeiyaku: 'api/deleteKeiyaku'
};
export const ROUTER_URL = {
    register: 'register',
    login: 'login',
    forgetPass: 'forget-pass',
    changePass: 'change-pass',
    changePassWord: 'change-password',
    personalInfo: 'personal-info',
    personalInfoSetting: 'personal-info-setting',
    familyList: 'family-list',
    familyInfo: 'family-info',
    familyInfoSetting: 'family-info-setting',
    startApply: 'start-apply',
    home: 'home',
    upload: 'upload',
    shoukenList: 'shouken-list',
    shoukenCamera: 'shouken-list/camera',
    shoukenDetail: 'shouken-detail',
    shoukenApplyComplete: 'shouken-apply-complete',
    insuranceType: 'insurance-type',
    insuranceInfo: 'insurance-info',
    insuranceInfoEdit: 'insurance-info-edit',
    insuranceContract: 'insurance-contract',
    setting: 'setting',
    settingInfo: 'setting-info',
    analyzer: 'analyzer',
    agencyList: 'agency-list',
    agencyInfo: 'agency-info',
    agencyInfoEdit: 'agency-info-edit',
    messageSend: 'message-send',
    messageList: 'message-list',
    viewAgencyInfo: 'view-agency-info',
    viewInsuranceInfo: 'view-insurance-info'
};
export const RESULT_CODE = {
    success: '001',
    DUPLICATE: '400',
    AUTH_FAIL: '401',
    NOT_EXIST: '404',
    REQUIRED: '101'
};

export const STATUS_HOKEN = [
    {
        status: '1',
        status_name: '契約中(保険料払込中)'
    },
    {
        status: '2',
        status_name: '契約中(保険料払込済)'
    },
    {
        status: '10',
        status_name: '満期(契約終了)'
    },
    {
        status: '11',
        status_name: '満期(年金受給中)'
    },
    {
        status: '90',
        status_name: '契約終了(死亡)'
    },
    {
        status: '91',
        status_name: '解約'
    },
];

export const HARAIKATA = [
    {
        id: '1',
        type: '年払'
    },
    {
        id: '2',
        type: '半年払'
    },
    {
        id: '3',
        type: '月払'
    },
    {
        id: '4',
        type: '前納'
    },
    {
        id: '6',
        type: '一括払'
    },
    {
        id: '9',
        type: 'その他'
    }
];

export const RELATIONS = [
    {
      relationID: 0,
      src: 'assets/img/identity-setting.png',
      title: '本人'
    },
    {
      relationID: 1,
      src: 'assets/img/identity-setting.png',
      title: '夫'
    },
    {
      relationID: 2,
      src: 'assets/img/wife.png',
      title: '妻'
    },
    {
      relationID: 13,
      src: 'assets/img/children.png',
      title: '子'
    },
    {
      relationID: 14,
      src: 'assets/img/identity-setting.png',
      title: '父'
    },
    {
      relationID: 15,
      src: 'assets/img/wife.png',
      title: '母親'
    },
    {
      relationID: 16,
      src: 'assets/img/children.png',
      title: '孫'
    },
    {
      relationID: 17,
      src: 'assets/img/identity-setting.png',
      title: '祖父'
    },
    {
      relationID: 18,
      src: 'assets/img/wife.png',
      title: '祖母'
    },
    {
      relationID: 99,
      src: 'assets/img/identity-setting.png',
      title: 'Other'
    },
  ];


  export const LIST_SRC = {
      icon0: 'assets/img/identity-setting.png',
      icon1: 'assets/img/identity-setting.png',
      icon2: 'assets/img/wife.png',
      icon13: 'assets/img/children.png',
      icon14: 'assets/img/identity-setting.png',
      icon15: 'assets/img/wife.png',
      icon16: 'assets/img/children.png',
      icon17: 'assets/img/identity-setting.png',
      icon18: 'assets/img/wife.png',
      icon99: 'assets/img/identity-setting.png',
      icon02: 'assets/img/wife.png',
  };

  export const LIST_KIKANF = [
    {
        id: '1',
        title: '年満了'
    },
    {
        id: '2',
        title: '歳満了'
    },
    {
        id: '3',
        title: '終身'
    },
    {
        id: '8',
        title: '1年未満'
    },
  ];
