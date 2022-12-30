import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) : Row{
    const ABCprice = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price)/2;
    const DEFprice = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price)/2;
    const Ratio = (ABCprice/DEFprice);
    const upperBound = 1 + 0.05;
    const lowerBound = 1 - 0.05;
      return {
        price_abc:ABCprice,
        price_def:DEFprice,
        ratio: Ratio,
        timestamp:serverResponds[0].timestamp > serverResponds[1].timestamp?serverResponds[0].timestamp:serverResponds[1].timestamp,
        upper_bound:upperBound,
        lower_bound:lowerBound,
        trigger_alert:(Ratio > upperBound || Ratio < lowerBound) ? Ratio:undefined
      };
  }
}
