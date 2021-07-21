import { CompanyDto } from "./CompanyDto";

export class IpoDto {
    public id: number = 0;

    public company = new CompanyDto();

    public stockExchangeName: string = "";

    public pricePerShare: number = 0;

    public totalShares: number = 0;

    public openDateTime: Date = new Date();

    public remarks: string = "";
}