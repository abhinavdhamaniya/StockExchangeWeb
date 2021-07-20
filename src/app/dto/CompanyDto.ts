import { SectorDto } from "./SectorDto";

export class CompanyDto {

    public id: number = 0;

    public companyName: String = "";

    public turnover: number = 0;

    public ceo: String = "";

    public boardOfDirectors: String = "";

    public listedInStockExchanges: Boolean = false;

    public sector: SectorDto = new SectorDto(0);

    public brief: String = "";

    public deactivated: Boolean = false;

    public stockExchangeIds: Array<number> = [];
}
