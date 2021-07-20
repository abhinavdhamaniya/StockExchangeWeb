import { SectorDto } from "./SectorDto";

export interface CompanyDto {

    id: number;

    companyName: String;

    turnover: number;

    ceo: String;

    boardOfDirectors: String;

    listedInStockExchanges: Boolean;

    sector: SectorDto;

    brief: String;

    deactivated: Boolean;

    stockExchangeIds: Array<number>;
}
