import 'package:wallet_apps/index.dart';
import 'package:http/http.dart' as _http;

class GetRequest {
  SelendraApi _sldApi = SelendraApi();

  Backend _backend = Backend();
  String response;

  Future<String> initContract() async {
    try {
      final res = await _http.get('http://localhost:3000/:service/contract/');
      var resJson = json.decode(res.body);
      response = resJson;
    } catch (e) {
     // print(e.toString());
    }
    return response;
  }

  Future<String> balanceOf(String from, String who) async {
    final res = await _http
        .get('http://localhost:3000/:service/contract/balanceof/$from/$who');
    var resJson = json.decode(res.body);
   // print(resJson);
    // ModelAsset().assetBalance = resJson['balanceOf'];
    String response = resJson['balanceOf'];
    return response;
  }

  Future<String> allowance(String owner, String spender) async {
    final res = await _http.get(
        'http://localhost:3000/:service/contract/allowance/$owner/$spender');
    var resJson = json.decode(res.body);
   // print(resJson);
    // ModelAsset().assetBalance = resJson['balanceOf'];
    String response = resJson['allowance'];
    return response;
  }

  Future<String> totalSupply(String from) async {
    final res = await _http
        .get('http://localhost:3000/:service/contract/totalsupply$from');
    var resJson = json.decode(res.body);
    //print(resJson);
    // ModelAsset().assetBalance = resJson['balanceOf'];
    String response = resJson['totalSupply'];
    return response;
  }

  Future<_http.Response> getUserProfile() async {
    /* Get User Profile */
    _backend.token = await ProviderBloc.fetchToken();
    if (_backend.token != null) {
      _backend.response = await _http.get("${_sldApi.api}/userprofile",
          headers: _backend.conceteHeader(
              "authorization", "Bearer ${_backend.token['token']}"));
      return _backend.response;
    }
    return null;
  }

  Future<_http.Response> checkExpiredToken() async {
    /* Expired Token In Welcome Screen */
    _backend.token = await ProviderBloc.fetchToken();
    if (_backend.token != null) {
      _backend.response = await _http.get("${_sldApi.api}/userprofile",
          headers: _backend.conceteHeader(
              "authorization", "Bearer ${_backend.token['token']}"));
      return _backend.response;
    }
    return null;
  }

  /* User History */
  Future<_http.Response> trxHistory() async {
    _backend.token = await ProviderBloc.fetchToken();
    if (_backend.token != null) {
      _backend.response = await _http.get("${_sldApi.api}/trx-history",
          headers: _backend.conceteHeader(
              "authorization", "Bearer ${_backend.token['token']}"));
      return _backend.response;
    }
    return null;
  }

  Future<_http.Response> getPortfolio() async {
    /* User Porfolio */
    _backend.token = await ProviderBloc.fetchToken();
    // print("My token ${_backend.token}");
    if (_backend.token != null) {
      _backend.response = await _http.get("${_sldApi.api}/portforlio",
          headers: _backend.conceteHeader(
              "authorization", "Bearer ${_backend.token['token']}"));
      return _backend.response;
    }
    return null;
  }

  Future getAllBranches() async {
    _backend.token = await ProviderBloc.fetchToken();
    if (_backend.token != null) {
      _backend.response = await _http.get("${_sldApi.api}/get-all-branches",
          headers: _backend.conceteHeader(
              "authorization", "Bearer ${_backend.token['token']}"));
      return json.decode(_backend.response.body);
    }
    return null;
  }

  Future<dynamic> getReceipt() async {
    _backend.token = await ProviderBloc.fetchToken();
    if (_backend.token != null) {
      _backend.response = await _http.get("${_sldApi.api}/get-receipt",
          headers: _backend.conceteHeader(
              "authorization", "Bearer ${_backend.token['token']}"));
      return json.decode(_backend.response.body);
    }
    return null;
  }
  /*--------------------------------Transaction--------------------------------*/

  /* List Branches */
  Future<List<dynamic>> listBranches() async {
    _backend.token = await ProviderBloc.fetchToken();
    if (_backend.token != null) {
      _backend.response = await _http.get('${_sldApi.api}/listBranches',
          headers: {
            HttpHeaders.authorizationHeader: "Bearer ${_backend.token['TOKEN']}"
          });
      _backend.data = json.decode(_backend.response.body);
      return _backend.data['message'];
    }
    return null;
  }

  // Future<Map<String, dynamic>> submitInvoice(ModelInvoice _model) async { /* Confirm Receipt */
  //   _backend.token = await Provider.fetchToken();
  //   if (_backend.token != null){
  //     _backend.response = await _http.post(
  //       "${_sldApi.api}/confirmreceipt",
  //       headers: {
  //         HttpHeaders.authorizationHeader: "Bearer ${_backend.token['TOKEN']}"
  //       },
  //       body: _model.bodyReceipt(_model)
  //     );
  //     return json.decode(_backend.response.body);
  //   }
  //   return null;
  // }
}
