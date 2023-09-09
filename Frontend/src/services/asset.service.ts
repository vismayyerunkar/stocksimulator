import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IAssetClassesResponse,
  IAssetPartnerListResponse,
  IAssetListResponse,
  IAssetDetailResponse,
  IAssetInvestmentResponse,
  IAddOrUpdateAssetResponse,
  IInvestableAssetResponse,
} from 'src/models/asset';
import { IGenericResponse } from 'src/models/genericModels';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor(private http: HttpClient) {}

  fetchAssetClasses(): Observable<IAssetClassesResponse> {
    const url = `${environment.baseUrl}apis/asset/v1/classes/`;
    let httpOptions = {};
    return this.http.get<IAssetClassesResponse>(url, httpOptions);
  }

  fetchPartnerList(): Observable<IAssetPartnerListResponse> {
    const token = `Token ${localStorage.getItem('authToken')}`;
    const url = `${environment.baseUrl}apis/users/staff/v1/partners/`;
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: token }),
    };
    return this.http.get<IAssetPartnerListResponse>(url, httpOptions);
  }

  fetchAssetList(
    offset: number,
    limit: number,
    startDate: any,
    endDate: any,
    statuses: string,
    assetClasses: string,
    partnerIds: string,
    sort_by: string
  ): Observable<any> {
    const url = `${environment.baseUrl}apis/asset/v1/staff/?offset=${offset}&limit=${limit}&statuses=${statuses}&start_date=${startDate}&end_date=${endDate}&asset_classes=${assetClasses}&partner_ids=${partnerIds}&sort_by=${sort_by}`;
    let httpOptions = {};
    return this.http.get<IAssetListResponse>(url, httpOptions);
  }

  fetchAssetDetails(assetId: string): Observable<IAssetDetailResponse> {
    const url = `${environment.baseUrl}apis/asset/v1/details/?asset_id=${assetId}`;
    let httpOptions = {};
    return this.http.get<IAssetDetailResponse>(url, httpOptions);
  }

  fetchAssetInvestments(assetId: string): Observable<IAssetInvestmentResponse> {
    const token = `Token ${localStorage.getItem('authToken')}`;
    const url = `${environment.baseUrl}apis/investor/staff/assets/v1/investments/?asset_id=${assetId}`;
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: token }),
    };
    return this.http.get<IAssetInvestmentResponse>(url, httpOptions);
  }

  fetchInvestableAsset(
    investmentId: string
  ): Observable<IInvestableAssetResponse> {
    const token = `Token ${localStorage.getItem('authToken')}`;
    const url = `${environment.baseUrl}apis/asset/v1/staff/investable/?investment_id=${investmentId}`;
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: token }),
    };
    return this.http.get<IInvestableAssetResponse>(url, httpOptions);
  }

  createOrUpdateAsset(body: FormData): Observable<IAddOrUpdateAssetResponse> {
    const url = `${environment.baseUrl}apis/asset/v1/staff/`;
    let httpOptions = {};
    return this.http.post<IAddOrUpdateAssetResponse>(url, body, httpOptions);
  }

  approveAsset(assetId: string): Observable<IGenericResponse> {
    const token = `Token ${localStorage.getItem('authToken')}`;
    const url = `${environment.baseUrl}apis/asset/v1/staff/approve/?asset_id=${assetId}`;
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: token }),
    };
    return this.http.post<IGenericResponse>(url, {}, httpOptions);
  }
  cancelAsset(assetId: string): Observable<IGenericResponse> {
    const token = `Token ${localStorage.getItem('authToken')}`;
    const url = `${environment.baseUrl}apis/asset/v1/staff/cancel/?asset_id=${assetId}`;
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: token }),
    };
    return this.http.post<IGenericResponse>(url, {}, httpOptions);
  }
}
