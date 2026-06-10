import { Language } from './types';

export const TRANSLATIONS: Record<Language, {
  header: {
    emsPro: string;
    resetTooltip: string;
    infoTooltip: string;
    logoutTooltip: string;
    acknowledgedBtn: string;
    systemInfoTitle: string;
    systemInfoDesc: string;
    depMode: string;
    depModeValue: string;
    brandPalette: string;
    brandPaletteValue: string;
    varnishLevel: string;
    varnishLevelValue: string;
  };
  login: {
    brand: string;
    title: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    recoverPasswordLink: string;
    loginBtn: string;
    loggingInBtn: string;
    dontHaveAccount: string;
    createAccountLink: string;
    upcomingTitleCount: string;
    eventsFallback: string;
    
    // Recovery modal
    recoverTitle: string;
    recoverDesc: string;
    recoverInputPlaceholder: string;
    recoverBtn: string;
    recoverSuccess: string;

    // Create Modal
    createTitle: string;
    createDesc: string;
    createFullName: string;
    createEmail: string;
    createCompany: string;
    createBtn: string;
    createSuccess: string;

    // Help Modal
    helpTitle: string;
    helpWhatIsTitle: string;
    helpWhatIsDesc: string;
    helpHowToTitle: string;
    helpHowToDesc: string;
    helpSupportTitle: string;
    helpSupportDesc: string;
    helpCloseBtn: string;
  };
  recover: {
    title: string;
    emailLabel: string;
    emailPlaceholder: string;
    backBtn: string;
    sendBtn: string;
    sendingBtn: string;
    successTitle: string;
    successSentText: string;
    successInstructionsText: string;
    errorEmailRequired: string;
    errorEmailInvalid: string;
  };
  createAccount: {
    title: string;
    desc: string;
    brand: string;
    firstNameLabel: string;
    firstNamePlaceholder: string;
    lastNameLabel: string;
    lastNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    repeatEmailLabel: string;
    repeatEmailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    passwordInstructions: string;
    typeLabel: string;
    captchaLabel: string;
    captchaPlaceholder: string;
    dataProtectionLabel: string;
    termsLabel: string;
    privacyLabel: string;
    backBtn: string;
    submitBtn: string;

    // Success state
    successTitle: string;
    successDesc: string;
    registryStatus: string;
    registryStatusValue: string;
    activationCode: string;
    assignedType: string;
    returnToLoginBtn: string;

    // Errors
    errFirstName: string;
    errLastName: string;
    errEmailRequired: string;
    errEmailInvalid: string;
    errEmailMismatch: string;
    errPasswordLength: string;
    errPasswordMismatch: string;
    errCaptchaIncorrect: string;
    errTermsRequired: string;
    errPrivacyRequired: string;
  };
  registrations: {
    title: string;
    notRegistered: string;
    incomplete: string;
    registered: string;
    testBadge: string;
    registerBtn: string;
    editBtn: string;
    noEvents: string;
  };
  footer: {
    imprintLabel: string;
    privacyLabel: string;
    imprintTitle: string;
    managingDirectors: string;
    contact: string;
    phone: string;
    registerEntry: string;
    registryCourt: string;
    registrationNumber: string;
    vatLabel: string;
    privacyTitle: string;
    privacyP1: string;
    privacyInfoColl: string;
    privacyInfoCollText: string;
    privacyRights: string;
    privacyRightsText: string;
    closeBtn: string;
  };
  wizard: {
    steps: { title: string; desc: string }[];
    datePlaceholder: string;
    locationPlaceholder: string;
    alertPrivacy: string;
    alertLockedSteps: string;
    alertSaving: string;
    previousTooltip: string;
    nextTooltip: string;
    statusControlBrand: string;
    progressHeader: string;
    furtherStepsLocked: string;
    
    // Personal information step
    personalTitle: string;
    salutationLabel: string;
    titleLabel: string;
    firstNameLabel: string;
    lastNameLabel: string;
    contactLangLabel: string;
    privacyCheckboxLabel: string;
    backToLoginBtn: string;
    nextBtn: string;
    backBtn: string;
    finishBtn: string;
    savingText: string;
  };
}> = {
  en: {
    header: {
      emsPro: 'EMS PRO',
      resetTooltip: 'Reset landing portal/Logout',
      infoTooltip: 'Xfair System info',
      logoutTooltip: 'Logout session',
      acknowledgedBtn: 'Acknowledge Settings',
      systemInfoTitle: 'XFAIR EMS Core Infrastructure',
      systemInfoDesc: 'The Event Management System (EMS) offers corporate fair organizers a robust platform to design, dispatch, and track registries. This prototype showcases the modernized gateway interface aligning layout components with sleek styling.',
      depMode: 'Deployment Mode:',
      depModeValue: 'Local Caching',
      brandPalette: 'Branded Palette:',
      brandPaletteValue: 'Orange (#f89728) & Slate Gray',
      varnishLevel: 'Varnish Level:',
      varnishLevelValue: 'High-Fidelity Modern Prototype'
    },
    login: {
      brand: 'XFAIR GMBH',
      title: 'Registration',
      emailLabel: 'Email address',
      emailPlaceholder: 'email@xfair.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      recoverPasswordLink: 'Recover password',
      loginBtn: 'Log in',
      loggingInBtn: 'Logging in...',
      dontHaveAccount: "Don't have an account?",
      createAccountLink: 'Create Account!',
      upcomingTitleCount: 'Upcoming event(s)',
      eventsFallback: 'No events scheduled currently.',
      recoverTitle: 'Recover System Password',
      recoverDesc: 'Provide your corporate email address registered under the Xfair EMS directory. We will shoot diagnostic coordinates to recalibrate credentials.',
      recoverInputPlaceholder: 'steven.terry@xfair.com',
      recoverBtn: 'Dispatch Reset Coordinate',
      recoverSuccess: 'Password reset link has been dispatched to ',
      createTitle: 'Create EMS Account',
      createDesc: 'Request access credentials to start submitting and organizing events. Your application must be validated by the respective event manager.',
      createFullName: 'Full Name',
      createEmail: 'Email address',
      createCompany: 'Company / Event Agency',
      createBtn: 'Submit access request',
      createSuccess: 'Registration submitted. Account waiting administrator activation.',
      helpTitle: 'EMS Portal Core Help',
      helpWhatIsTitle: 'What is Xfair EMS?',
      helpWhatIsDesc: 'Xfair Event Management System is a centralized secure framework utilized to operate registrars, user telemetry, and dynamic fair schedules.',
      helpHowToTitle: 'How to login?',
      helpHowToDesc: 'For standard testing purposes, you may directly use the pre-entered credentials (Email: steven.terry@xfair.com) and click the active orange Log in block.',
      helpSupportTitle: 'System Assistance:',
      helpSupportDesc: 'If you face directory sync issues, contact system administration at support@xfair.com.',
      helpCloseBtn: 'Understood'
    },
    recover: {
      title: 'Recover your password',
      emailLabel: 'Email',
      emailPlaceholder: 'Email',
      backBtn: 'Back',
      sendBtn: 'Send',
      sendingBtn: 'Sending...',
      successTitle: 'Recover your Password',
      successSentText: 'A password recovery link has been sent to ',
      successInstructionsText: 'Please follow the instructions in the email to create a new password and regain access to the system.',
      errorEmailRequired: 'Please enter your email.',
      errorEmailInvalid: 'Please enter a valid email address.'
    },
    createAccount: {
      title: 'Create Account',
      desc: 'After providing the required information (* ) and submitting, an activation link will be sent to your email address to set up your credentials safely.',
      brand: 'Xfair GmbH',
      firstNameLabel: 'First name',
      firstNamePlaceholder: 'Enter first name',
      lastNameLabel: 'Last name',
      lastNamePlaceholder: 'Enter last name',
      emailLabel: 'Your email address',
      emailPlaceholder: 'Enter email',
      repeatEmailLabel: 'Repeat email',
      repeatEmailPlaceholder: 'Repeat email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter password',
      confirmPasswordLabel: 'Confirm password',
      confirmPasswordPlaceholder: 'Confirm password',
      passwordInstructions: 'Password must be at least 12 characters. Avoid using trivial combinations, your company name, or your email address prefix.',
      typeLabel: 'Type',
      captchaLabel: 'Captcha',
      captchaPlaceholder: 'Type captcha',
      dataProtectionLabel: 'Data Protection',
      termsLabel: 'Terms and Conditions',
      privacyLabel: 'Data Privacy',
      backBtn: 'Back to Login',
      submitBtn: 'Create Account',
      successTitle: 'Activation Link Dispatched',
      successDesc: 'We have dispatched an activation link to ',
      registryStatus: 'Registry Status:',
      registryStatusValue: 'Awaiting Activation',
      activationCode: 'Activation Code:',
      assignedType: 'Assigned User Type:',
      returnToLoginBtn: 'Return to Login',
      errFirstName: 'First name is required.',
      errLastName: 'Last name is required.',
      errEmailRequired: 'Email is required.',
      errEmailInvalid: 'Please enter a valid email address.',
      errEmailMismatch: 'Email addresses do not match.',
      errPasswordLength: 'Password must be at least 12 characters.',
      errPasswordMismatch: 'Passwords do not match.',
      errCaptchaIncorrect: 'The captcha code is incorrect.',
      errTermsRequired: 'Terms agreement is required.',
      errPrivacyRequired: 'Privacy agreement is required.'
    },
    registrations: {
      title: 'Registration Overview',
      notRegistered: 'Not registered',
      incomplete: 'Incomplete',
      registered: 'Registered',
      testBadge: 'TEST',
      registerBtn: 'Register',
      editBtn: 'Edit',
      noEvents: 'No trade shows available.'
    },
    footer: {
      imprintLabel: 'Imprint',
      privacyLabel: 'Data Privacy',
      imprintTitle: 'Imprint (Legal Disclosure)',
      managingDirectors: 'Represented by Managing Directors:',
      contact: 'Contact:',
      phone: 'Phone:',
      registerEntry: 'Register Entry:',
      registryCourt: 'Registry Court:',
      registrationNumber: 'Registration Number:',
      vatLabel: 'VAT Identification Number according to § 27a UStG:',
      privacyTitle: 'Data Privacy Policy',
      privacyP1: 'We take security extremeley seriously. Any personal or corporate email addresses logged into our portal (e.g. steven.terry@xfair.com) are used for telemetry and credential caching procedures strictly localized inside secure sessions.',
      privacyInfoColl: 'Information Collection:',
      privacyInfoCollText: "Your session coordinates, preferences, and checklist inputs are stored only in your browser's local state storage, and are never dispatched to unauthorized external agencies.",
      privacyRights: 'Your Rights:',
      privacyRightsText: 'At any moment, clicking the Logout (Power) action clears all active session cache instantly.',
      closeBtn: 'Close Policy'
    },
    wizard: {
      steps: [
        { title: 'Personal data', desc: 'Secure profile & regulations check' },
        { title: 'Attendance / time', desc: 'Daily fair-day scheduler' },
        { title: 'Meeting Rooms', desc: 'Session & floor desk planner' },
        { title: 'Hotel request', desc: 'Accommodation coordinates' },
        { title: 'Personal Calendar', desc: 'Custom schedules & sessions' },
        { title: 'Accompanying person', desc: 'Guest & partner attendance' },
        { title: 'Postcode range', desc: 'Regional scope planner' },
        { title: 'Travel', desc: 'Transportation planning' },
        { title: 'Orders', desc: 'Merchandise and extra tickets' },
        { title: 'Deputies', desc: 'Assigned proxies and stand-ins' },
        { title: 'Download Area', desc: 'Maps, layouts and guidelines' },
        { title: 'Summary', desc: 'Final audit & dispatch' }
      ],
      datePlaceholder: 'No dates scheduled',
      locationPlaceholder: 'München, Germany',
      alertPrivacy: '⚠️ You must agree to the Data Protection statement to proceed.',
      alertLockedSteps: '🔒 Further step screens are currently locked.',
      alertSaving: '🎉 Saving your parameters & completing registration...',
      previousTooltip: 'Previous steps',
      nextTooltip: 'Next steps',
      statusControlBrand: 'XFAIR STATUS CONTROL',
      progressHeader: '12-Stage Registry Progress',
      furtherStepsLocked: '🔒 Further step screens are currently locked.',
      personalTitle: 'Personal information',
      salutationLabel: 'Salutation',
      titleLabel: 'Title',
      firstNameLabel: 'First name',
      lastNameLabel: 'Last name',
      contactLangLabel: 'Preferred contact language',
      privacyCheckboxLabel: 'Terms & Conditions & Data Privacy statement accepted',
      backToLoginBtn: 'Back to Login',
      nextBtn: 'Next step',
      backBtn: 'Previous step',
      finishBtn: 'Complete Registration',
      savingText: 'Saving...'
    }
  },
  uk: {
    header: {
      emsPro: 'EMS PORTAL',
      resetTooltip: 'Reset landing portal/Logout',
      infoTooltip: 'Xfair System info',
      logoutTooltip: 'Logout session',
      acknowledgedBtn: 'Acknowledge Settings',
      systemInfoTitle: 'XFAIR EMS Core Infrastructure',
      systemInfoDesc: 'The Event Management System (EMS) offers corporate fair organizers a robust platform to design, dispatch, and track registries. This prototype showcases the modernized gateway interface aligning layout components with sleek styling.',
      depMode: 'Deployment Mode:',
      depModeValue: 'Local Caching',
      brandPalette: 'Branded Palette:',
      brandPaletteValue: 'Orange (#f89728) & Slate Gray',
      varnishLevel: 'Varnish Level:',
      varnishLevelValue: 'High-Fidelity Modern Prototype'
    },
    login: {
      brand: 'XFAIR GMBH',
      title: 'Registration Portal',
      emailLabel: 'Email address',
      emailPlaceholder: 'email@xfair.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      recoverPasswordLink: 'Recover password',
      loginBtn: 'Log in',
      loggingInBtn: 'Logging in...',
      dontHaveAccount: "Don't have an account?",
      createAccountLink: 'Create Account!',
      upcomingTitleCount: 'Scheduled event(s)',
      eventsFallback: 'No events scheduled currently.',
      recoverTitle: 'Recover System Password',
      recoverDesc: 'Provide your corporate email address registered under the Xfair EMS directory. We will shoot diagnostic coordinates to recalibrate credentials.',
      recoverInputPlaceholder: 'steven.terry@xfair.com',
      recoverBtn: 'Dispatch Reset Coordinate',
      recoverSuccess: 'Password reset link has been dispatched to ',
      createTitle: 'Create EMS Account',
      createDesc: 'Request access credentials to start submitting and organizing events. Your application must be validated by the respective event manager.',
      createFullName: 'Full Name',
      createEmail: 'Email address',
      createCompany: 'Company / Event Agency',
      createBtn: 'Submit access request',
      createSuccess: 'Registration submitted. Account waiting administrator activation.',
      helpTitle: 'EMS Portal Core Help',
      helpWhatIsTitle: 'What is Xfair EMS?',
      helpWhatIsDesc: 'Xfair Event Management System is a centralized secure framework utilized to operate registrars, user telemetry, and dynamic fair schedules.',
      helpHowToTitle: 'How to login?',
      helpHowToDesc: 'For standard testing purposes, you may directly use the pre-entered credentials (Email: steven.terry@xfair.com) and click the active orange Log in block.',
      helpSupportTitle: 'System Assistance:',
      helpSupportDesc: 'If you face directory sync issues, contact system administration at support@xfair.com.',
      helpCloseBtn: 'Understood'
    },
    recover: {
      title: 'Recover your password',
      emailLabel: 'Email',
      emailPlaceholder: 'Email',
      backBtn: 'Back',
      sendBtn: 'Send',
      sendingBtn: 'Sending...',
      successTitle: 'Recover your Password',
      successSentText: 'A password recovery link has been sent to ',
      successInstructionsText: 'Please follow the instructions in the email to create a new password and regain access to the system.',
      errorEmailRequired: 'Please enter your email.',
      errorEmailInvalid: 'Please enter a valid email address.'
    },
    createAccount: {
      title: 'Create Account',
      desc: 'After providing the required information (* ) and submitting, an activation link will be sent to your email address to set up your credentials safely.',
      brand: 'Xfair GmbH',
      firstNameLabel: 'First name',
      firstNamePlaceholder: 'Enter first name',
      lastNameLabel: 'Last name',
      lastNamePlaceholder: 'Enter last name',
      emailLabel: 'Your email address',
      emailPlaceholder: 'Enter email',
      repeatEmailLabel: 'Repeat email',
      repeatEmailPlaceholder: 'Repeat email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter password',
      confirmPasswordLabel: 'Confirm password',
      confirmPasswordPlaceholder: 'Confirm password',
      passwordInstructions: 'Password must be at least 12 characters. Avoid using trivial combinations, your company name, or your email address prefix.',
      typeLabel: 'Type',
      captchaLabel: 'Captcha',
      captchaPlaceholder: 'Type captcha',
      dataProtectionLabel: 'Data Protection',
      termsLabel: 'Terms and Conditions',
      privacyLabel: 'Data Privacy',
      backBtn: 'Back to Login',
      submitBtn: 'Create Account',
      successTitle: 'Activation Link Dispatched',
      successDesc: 'We have dispatched an activation link to ',
      registryStatus: 'Registry Status:',
      registryStatusValue: 'Awaiting Activation',
      activationCode: 'Activation Code:',
      assignedType: 'Assigned User Type:',
      returnToLoginBtn: 'Return to Login',
      errFirstName: 'First name is required.',
      errLastName: 'Last name is required.',
      errEmailRequired: 'Email is required.',
      errEmailInvalid: 'Please enter a valid email address.',
      errEmailMismatch: 'Email addresses do not match.',
      errPasswordLength: 'Password must be at least 12 characters.',
      errPasswordMismatch: 'Passwords do not match.',
      errCaptchaIncorrect: 'The captcha code is incorrect.',
      errTermsRequired: 'Terms agreement is required.',
      errPrivacyRequired: 'Privacy agreement is required.'
    },
    registrations: {
      title: 'Registrations overview',
      notRegistered: 'Not registered',
      incomplete: 'Incomplete',
      registered: 'Registered',
      testBadge: 'TEST',
      registerBtn: 'Register',
      editBtn: 'Edit',
      noEvents: 'No trade shows available.'
    },
    footer: {
      imprintLabel: 'Imprint',
      privacyLabel: 'Data Privacy',
      imprintTitle: 'Imprint (Legal Disclosure)',
      managingDirectors: 'Represented by Managing Directors:',
      contact: 'Contact:',
      phone: 'Phone:',
      registerEntry: 'Register Entry:',
      registryCourt: 'Registry Court:',
      registrationNumber: 'Registration Number:',
      vatLabel: 'VAT Identification Number according to § 27a UStG:',
      privacyTitle: 'Data Privacy Policy',
      privacyP1: 'We take security extremeley seriously. Any personal or corporate email addresses logged into our portal (e.g. steven.terry@xfair.com) are used for telemetry and credential caching procedures strictly localized inside secure sessions.',
      privacyInfoColl: 'Information Collection:',
      privacyInfoCollText: "Your session coordinates, preferences, and checklist inputs are stored only in your browser's local state storage, and are never dispatched to unauthorized external agencies.",
      privacyRights: 'Your Rights:',
      privacyRightsText: 'At any moment, clicking the Logout (Power) action clears all active session cache instantly.',
      closeBtn: 'Close Policy'
    },
    wizard: {
      steps: [
        { title: 'Personal data', desc: 'Secure profile & regulations check' },
        { title: 'Attendance / time', desc: 'Daily fair-day scheduler' },
        { title: 'Meeting Rooms', desc: 'Session & floor desk planner' },
        { title: 'Hotel request', desc: 'Accommodation coordinates' },
        { title: 'Personal Calendar', desc: 'Custom schedules & sessions' },
        { title: 'Accompanying person', desc: 'Guest & partner attendance' },
        { title: 'Postcode range', desc: 'Regional scope planner' },
        { title: 'Travel', desc: 'Transportation planning' },
        { title: 'Orders', desc: 'Merchandise and extra tickets' },
        { title: 'Deputies', desc: 'Assigned proxies and stand-ins' },
        { title: 'Download Area', desc: 'Maps, layouts and guidelines' },
        { title: 'Summary', desc: 'Final audit & dispatch' }
      ],
      datePlaceholder: 'No dates scheduled',
      locationPlaceholder: 'München, Germany',
      alertPrivacy: '⚠️ You must agree to the Data Protection statement to proceed.',
      alertLockedSteps: '🔒 Further step screens are currently locked.',
      alertSaving: '🎉 Saving your parameters & completing registration...',
      previousTooltip: 'Previous steps',
      nextTooltip: 'Next steps',
      statusControlBrand: 'XFAIR STATUS CONTROL',
      progressHeader: '12-Stage Registry Progress',
      furtherStepsLocked: '🔒 Further step screens are currently locked.',
      personalTitle: 'Personal information',
      salutationLabel: 'Salutation',
      titleLabel: 'Title',
      firstNameLabel: 'First name',
      lastNameLabel: 'Last name',
      contactLangLabel: 'Preferred contact language',
      privacyCheckboxLabel: 'Terms & Conditions & Data Privacy statement accepted',
      backToLoginBtn: 'Back to Login',
      nextBtn: 'Next step',
      backBtn: 'Previous step',
      finishBtn: 'Complete Registration',
      savingText: 'Saving...'
    }
  },
  de: {
    header: {
      emsPro: 'EMS PRO',
      resetTooltip: 'Anmeldeportal zurücksetzen/Abmelden',
      infoTooltip: 'Systeminformationen',
      logoutTooltip: 'Sitzung beenden',
      acknowledgedBtn: 'Einstellungen bestätigen',
      systemInfoTitle: 'XFAIR EMS Kerninfrastruktur',
      systemInfoDesc: 'Das Event-Management-System (EMS) bietet Messeorganisatoren eine robuste Plattform zum Entwerfen, Versenden und Verfolgen von Registrierungen. Dieser Prototyp zeigt die modernisierte Portalschnittstelle mit elegantem Design.',
      depMode: 'Bereitstellungsmodus:',
      depModeValue: 'Lokales Caching',
      brandPalette: 'Markenpalette:',
      brandPaletteValue: 'Orange (#f89728) & Schiefergrau',
      varnishLevel: 'Qualitätsgrad:',
      varnishLevelValue: 'Modern Hochwertiger Prototyp'
    },
    login: {
      brand: 'XFAIR GMBH',
      title: 'Registrierung',
      emailLabel: 'E-Mail-Adresse',
      emailPlaceholder: 'email@xfair.com',
      passwordLabel: 'Passwort',
      passwordPlaceholder: '••••••••',
      recoverPasswordLink: 'Passwort wiederherstellen',
      loginBtn: 'Anmelden',
      loggingInBtn: 'Anmeldung läuft...',
      dontHaveAccount: 'Noch kein Konto?',
      createAccountLink: 'Konto erstellen!',
      upcomingTitleCount: 'Anstehende(s) Event(s)',
      eventsFallback: 'Derzeit keine Veranstaltungen geplant.',
      recoverTitle: 'Systempasswort wiederherstellen',
      recoverDesc: 'Geben Sie Ihre im Xfair EMS-Verzeichnis registrierte Firmen-E-Mail-Adresse ein. Wir senden Ihnen diagnostische Koordinaten zur Neukalibrierung der Zugangsdaten.',
      recoverInputPlaceholder: 'steven.terry@xfair.com',
      recoverBtn: 'Zurücksetzungs-Link senden',
      recoverSuccess: 'Ein Link zum Zurücksetzen des Passworts wurde gesendet an: ',
      createTitle: 'EMS-Konto erstellen',
      createDesc: 'Fordern Sie Zugangsdaten an, um Veranstaltungen einzureichen und zu verwalten. Ihre Anmeldung wird vom zuständigen Event-Manager geprüft.',
      createFullName: 'Vollständiger Name',
      createEmail: 'E-Mail-Adresse',
      createCompany: 'Unternehmen / Agentur',
      createBtn: 'Zugangsantrag absenden',
      createSuccess: 'Registrierung eingereicht. Konto wartet auf Admin-Aktivierung.',
      helpTitle: 'EMS Portal-Hilfe',
      helpWhatIsTitle: 'Was ist Xfair EMS?',
      helpWhatIsDesc: 'Das Xfair Event-Management-System ist ein zentralisiertes, sicheres Framework für Registrierungsdaten, Benutzerstatistiken und dynamische Messelayouts.',
      helpHowToTitle: 'Wie melde ich mich an?',
      helpHowToDesc: 'Zu Testzwecken können Sie die voreingegebenen Zugangsdaten verwenden (E-Mail: steven.terry@xfair.com) und auf den orangenen Anmelde-Button klicken.',
      helpSupportTitle: 'Systemunterstützung:',
      helpSupportDesc: 'Bei Problemen mit der Verzeichnissynchronisierung kontaktieren Sie die Systemadministration unter support@xfair.com.',
      helpCloseBtn: 'Verstanden'
    },
    recover: {
      title: 'Passwort wiederherstellen',
      emailLabel: 'E-Mail-Adresse',
      emailPlaceholder: 'E-Mail-Adresse',
      backBtn: 'Zurück',
      sendBtn: 'Senden',
      sendingBtn: 'Wird gesendet...',
      successTitle: 'Passwort wiederherstellen',
      successSentText: 'Ein Link zur Passwortwiederherstellung wurde gesendet an ',
      successInstructionsText: 'Bitte folgen Sie den Anweisungen in der E-Mail, um ein neues Passwort zu erstellen und wieder Zugriff auf das System zu erhalten.',
      errorEmailRequired: 'Bitte geben Sie Ihre E-Mail-Adresse ein.',
      errorEmailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
    },
    createAccount: {
      title: 'Konto erstellen',
      desc: 'Nach der Angabe der erforderlichen Informationen (* ) und dem Absenden wird ein Aktivierungslink an Ihre E-Mail-Adresse gesendet, um Ihre Anmeldedaten sicher einzurichten.',
      brand: 'Xfair GmbH',
      firstNameLabel: 'Vorname',
      firstNamePlaceholder: 'Vorname eingeben',
      lastNameLabel: 'Nachname',
      lastNamePlaceholder: 'Nachname eingeben',
      emailLabel: 'Ihre E-Mail-Adresse',
      emailPlaceholder: 'E-Mail eingeben',
      repeatEmailLabel: 'E-Mail wiederholen',
      repeatEmailPlaceholder: 'E-Mail wiederholen',
      passwordLabel: 'Passwort',
      passwordPlaceholder: 'Passwort eingeben',
      confirmPasswordLabel: 'Passwort bestätigen',
      confirmPasswordPlaceholder: 'Passwort bestätigen',
      passwordInstructions: 'Das Passwort muss mindestens 12 Zeichen lang sein. Vermeiden Sie einfache Kombinationen, Ihren Firmennamen oder den Präfix Ihrer E-Mail-Adresse.',
      typeLabel: 'Typ',
      captchaLabel: 'Captcha',
      captchaPlaceholder: 'Captcha eingeben',
      dataProtectionLabel: 'Data Datenschutz',
      termsLabel: 'Allgemeine Geschäftsbedingungen (AGB)',
      privacyLabel: 'Datenschutzbestimmungen',
      backBtn: 'Zurück zum Login',
      submitBtn: 'Konto erstellen',
      successTitle: 'Aktivierungslink versendet',
      successDesc: 'Wir haben einen Aktivierungslink gesendet an ',
      registryStatus: 'Registrierungsstatus:',
      registryStatusValue: 'Wartet auf Aktivierung',
      activationCode: 'Aktivierungscode:',
      assignedType: 'Zugewiesener Typ:',
      returnToLoginBtn: 'Zurück zum Login',
      errFirstName: 'Vorname ist erforderlich.',
      errLastName: 'Nachname ist erforderlich.',
      errEmailRequired: 'E-Mail ist erforderlich.',
      errEmailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      errEmailMismatch: 'Die E-Mail-Adressen stimmen nicht überein.',
      errPasswordLength: 'Das Passwort muss mindestens 12 Zeichen lang sein.',
      errPasswordMismatch: 'Die Passwörter stimmen nicht überein.',
      errCaptchaIncorrect: 'Der Captcha-Code ist nicht korrekt.',
      errTermsRequired: 'Die Zustimmung zu den AGB ist erforderlich.',
      errPrivacyRequired: 'Die Zustimmung zum Datenschutz ist erforderlich.'
    },
    registrations: {
      title: 'Registrierungsübersicht',
      notRegistered: 'Nicht registriert',
      incomplete: 'Unvollständig',
      registered: 'Registriert',
      testBadge: 'TEST',
      registerBtn: 'Registrieren',
      editBtn: 'Bearbeiten',
      noEvents: 'Keine Messen verfügbar.'
    },
    footer: {
      imprintLabel: 'Impressum',
      privacyLabel: 'Datenschutz',
      imprintTitle: 'Impressum (Gesetzliche Anbieterkennzeichnung)',
      managingDirectors: 'Vertreten durch die Geschäftsführer:',
      contact: 'Kontakt:',
      phone: 'Telefon:',
      registerEntry: 'Registereintrag:',
      registryCourt: 'Registergericht:',
      registrationNumber: 'Registernummer:',
      vatLabel: 'Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:',
      privacyTitle: 'Datenschutzerklärung',
      privacyP1: 'Wir nehmen das Thema Sicherheit äußerst ernst. Alle in unserem Portal registrierten E-Mail-Adressen (z. B. steven.terry@xfair.com) werden ausschließlich für telemetry- und cached-Verfahren innerhalb sicherer Sitzungen verwendet.',
      privacyInfoColl: 'Informationserhebung:',
      privacyInfoCollText: 'Ihre Sitzungsparameter, Einstellungen und Checklisten-Eingaben werden ausschließlich im lokalen Speicher Ihres Browsers abgelegt und niemals an unbefugte externe Stellen weitergegeben.',
      privacyRights: 'Ihre Rechte:',
      privacyRightsText: 'Durch Klicken auf die Abmeldeschaltfläche (Power-Icon) werden alle aktiven Sitzungscaches sofort gelöscht.',
      closeBtn: 'Richtlinie schließen'
    },
    wizard: {
      steps: [
        { title: 'Persönliche Daten', desc: 'Profilprüfung & Datenschutz-Check' },
        { title: 'Anwesenheit / Zeit', desc: 'Täglicher Messezeitplaner' },
        { title: 'Besprechungsräume', desc: 'Sitzungs- & Bodenplaner' },
        { title: 'Hotelanfrage', desc: 'Unterkunftskoordinaten' },
        { title: 'Persönlicher Kalender', desc: 'Eigene Pläne & Sitzungen' },
        { title: 'Begleitperson', desc: 'Gast- & Partneranwesenheit' },
        { title: 'Postleitzahlbereich', desc: 'Regionaler Planer' },
        { title: 'Reisedaten', desc: 'Transportplanung' },
        { title: 'Bestellungen', desc: 'Merchandise und Extratickets' },
        { title: 'Vertreter', desc: 'Zugewiesene Stellvertreter' },
        { title: 'Download-Bereich', desc: 'Karten, Layouts und Richtlinien' },
        { title: 'Zusammenfassung', desc: 'Abschlussprüfung & Absenden' }
      ],
      datePlaceholder: 'Keine Termine geplant',
      locationPlaceholder: 'München, Deutschland',
      alertPrivacy: '⚠️ Sie müssen den Datenschutzbestimmungen zustimmen, um fortzufahren.',
      alertLockedSteps: '🔒 Weitere Schritte sind derzeit gesperrt.',
      alertSaving: '🎉 Speichern Ihrer Parameter und Abschließen der Registrierung...',
      previousTooltip: 'Vorherige Schritte',
      nextTooltip: 'Nächste Schritte',
      statusControlBrand: 'XFAIR STATUSKONTROLLE',
      progressHeader: '12-stufiger Registrierungsfortschritt',
      furtherStepsLocked: '🔒 Weitere Schritte sind derzeit gesperrt.',
      personalTitle: 'Persönliche Angaben',
      salutationLabel: 'Anrede',
      titleLabel: 'Titel',
      firstNameLabel: 'Vorname',
      lastNameLabel: 'Nachname',
      contactLangLabel: 'Bevorzugte Kontaktsprache',
      privacyCheckboxLabel: 'Allgemeine Geschäftsbedingungen & Datenschutzbestimmungen akzeptiert',
      backToLoginBtn: 'Zurück zum Login',
      nextBtn: 'Nächster Schritt',
      backBtn: 'Vorheriger Schritt',
      finishBtn: 'Registrierung abschließen',
      savingText: 'Wird gespeichert...'
    }
  }
};
