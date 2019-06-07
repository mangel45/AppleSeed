export class IdApplicationNavigation {
    public namecompany: string;
    public descriptioncase: string;
    public createby: string;
    public CompanyOsc:CompanyOsc = new CompanyOsc();
    public CompanyDetail:CompanyDetail[] = [new CompanyDetail()];
    public CompanyContacto:CompanyContacto[] = [new CompanyContacto()];
    public CompanyComment:CompanyComment[] = [new CompanyComment()];
    public CompanyAttachmentAnnualAudits:CompanyAttachmentAnnualAudits[] = [new CompanyAttachmentAnnualAudits()];
    public CompanyAttachmentClunis: CompanyAttachmentClunis[] = [new CompanyAttachmentClunis()];
    public CompanyAttachmentConstitutiveActs:CompanyAttachmentConstitutiveActs[] = [new CompanyAttachmentConstitutiveActs()];
    public CompanyAttachmentOthers:CompanyAttachmentOthers[] = [new CompanyAttachmentOthers()];
    public CompanyAttachmentRelatorioAnnuals:CompanyAttachmentRelatorioAnnuals[] = [new CompanyAttachmentRelatorioAnnuals()];
    public CompanyAttachmentReportLogroes:CompanyAttachmentReportLogroes[] = [new CompanyAttachmentReportLogroes()];
    public CompanyAttachmentRfcs:CompanyAttachmentRfcs[] = [new CompanyAttachmentRfcs()];
    public CompanyAttachmentSatBills:CompanyAttachmentSatBills[] = [new CompanyAttachmentSatBills()];
}

export class CompanyOsc {
    public email:string;
    public phone:number;
    public idcountry:number;
    public idstate:number;
    public idcity:number;
    public siteweb:string;
    public address:string;
    public postalcode:number;
    public rfccompany:any;
    public descriptioncompany:string;
    public Createby: any;
}

export class CompanyDetail {
    public TargetPopulation:string;
    public MainMaterias:string;
    public FinancialSupport:boolean;
    public FinReligious:boolean;
    public DirectorName: string;
    public Createby:any;
}

export class CompanyContacto {
    public NameFull:string;
    public Email:string;
    public PositionOsc:string;
    public Phone:boolean;
    public Celular:number;
    public Createby: any;
}

export class CompanyComment {
    public HowDidYou:number;
    public Comments:string;
    public AcceptTerms:boolean;
    public LastChange:Date;
    public AnswerLastChange:string;
    public Createby:any;
}

export class CompanyAttachmentAnnualAudits {
    public NameDocument:string;
    public Url:any;
}

export class CompanyAttachmentClunis {
    public NameDocument:string;
    public Url:any;
}

export class CompanyAttachmentConstitutiveActs {
    public NameDocument:string;
    public Url:any;
}

export class CompanyAttachmentOthers {
    public NameDocument:string;
    public Url:any;
}

export class CompanyAttachmentRelatorioAnnuals {
    public NameDocument:string;
    public Url:any;
}

export class CompanyAttachmentReportLogroes {
    public NameDocument:string;
    public Url:any;
}

export class CompanyAttachmentRfcs {
    public NameDocument:string;
    public Url:any;
}

export class CompanyAttachmentSatBills {
    public NameDocument:string;
    public Url:any;
}

