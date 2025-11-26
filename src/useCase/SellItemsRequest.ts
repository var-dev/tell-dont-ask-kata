import SellItemRequest from "./SellItemRequest";
import {cloneDeep} from "lodash"

class SellItemsRequest {
  constructor(private requests: SellItemRequest[]){}
  public addRequest(request: SellItemRequest): void {
      this.requests.push(request);
  }

  get getRequests(): SellItemRequest[] {
    return cloneDeep(this.requests);
  }
}

export default SellItemsRequest;
