import { ShuKeiyaku, Tokuyakus } from './keiyaku';

export class KeiyakuView {
    FileName = null;
    keiyakuField: KeiyakuField = new KeiyakuField();
    keiyaku = Keiyaku;
    shuKeiyaku: ShuKeiyaku[] = [];
    tokuyakus: Tokuyakus[] = [];
}

const Keiyaku = [
    {title: '代理店名', value: null, column: 'AgentName'},

    {title: '保険会社名', value: null, column: 'CompanyName'},

    {title: '保険種類', value: null, column: 'ProductName'},

    {title: '証券番号', value: null, column: 'PolicyNo'},

    {title: '契約状況', value: null, column: 'StatusName'},

    {title: '契約者', value: null, column: 'FamilyName'},

    {title: '被保険者', value: null, column: 'HihoFamilyName'},

    {title: '契約日/保険始期日', value: null, column: 'ContractDate'},

    {title: '保険終期日', value: null, column: 'HokenEndDate'},

    {title: '保険期間', value: null, column: 'HKikanName'},

    {title: '保険料', value: null, column: 'HokenP'},

    {title: '保険料払込方法 (払方)', value: null, column: 'HaraikataName'},

    {title: '保険料払込期間', value: null, column: 'PKikanName'},
];

export class KeiyakuField {
    AgentName = null;
    AgentNo = null;
    CategoryCd = null;
    CompanyCd = null;
    CompanyName = null;
    ContractDate = null;
    FamilyName = null;
    FamilyNo = null;
    FileName = null;
    GroupID = null;
    HKikan = null;
    HKikanF = null;
    HKikanName = null;
    Haraikata = null;
    HaraikataName = null;
    HihoFamilyName = null;
    HihoFamilyNo = null;
    HokenEndDate = null;
    HokenP = null;
    HoshoCategoryF = null;
    KaniShindanF = true;
    KeiyakuNo = null;
    Memo = null;
    PKikan = null;
    PKikanF = null;
    PKikanName = null;
    Phone = null;
    PolicyNo = null;
    ProductCd = null;
    ProductName = null;
    ShokenBunsekiF = true;
    Status = null;
    StatusName = null;
    TantoNameCompany = null;
    TantoNameKeiyaku = null;
    URL = null;
}
