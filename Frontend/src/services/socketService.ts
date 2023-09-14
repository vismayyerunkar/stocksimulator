import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';  

@Injectable({
	providedIn: 'root'
})

export class SocketService {
	constructor(private socket: Socket) { }

	// emit event
	getStockData(data:any) {
		return this.socket.emit('GET_STOCK_DATA',{symbols:data});
	} 

	subscribeToContinousData(){
		return this.socket.fromEvent("PRICE_CHANGED")
	}

	fetchTopStocks() {
		// listen event
		return this.socket.fromEvent('TRENDING_STOCKS')
	}
}