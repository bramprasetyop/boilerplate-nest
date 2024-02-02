import { Claim } from '../entity/claim.entity';

export class PagingClaim {
  data: Claim[];
  meta: {
    pageSize: number;
    currentPage: number;
    total: number;
    totalPage: number;
  };
}
