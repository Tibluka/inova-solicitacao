import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { LoadingService } from './loading.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuscaCepService {

  url = 'https://viacep.com.br/ws/'

  constructor(private apiService: ApiService,
    public loadingService: LoadingService,
    private http: HttpClient) {

  }

  getCep(params) {
    this.apiService.getCepApi(this.url + params + '/json').subscribe(res => {
      console.log(res);
    })
  }

/*   calcularFrete() {
    debugger
    this.http.post('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx', { responseType: 'text' })
      .pipe(
        map((xmlString: string) => {
          debugger
          const asJson = this.xmlStringToJson(xmlString);
          debugger
          return asJson;
        }),
        catchError((err) => {
          console.warn('INT ERR:', err);
          return err;
        })
      );
  } */

  xmlStringToJson(xml: string) {
    debugger
    const oParser = new DOMParser();
    const xmlDoc = oParser.parseFromString(xml, "application/xml")
  }

  xmlToJson(xml){
    debugger
    // Create the return object
    var obj = {};
debugger
    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for(var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  }

}
