import 'package:wallet_apps/src/models/attendant.m.dart';

class ContractModel {

  AttendantModel attendantM = AttendantModel();

  bool isContain = false;
  //list of partition token symbol
  String pContractAddress = '';

  String pTokenSymbol = 'KMPI';

  String pOrg = 'KOOMPI';

  //parition balance
  String pBalance = '0';

  //partion token logo
  String ptLogo = 'assets/koompi_white_logo.png';

  //partitionHash
  String pHash = '';

  // ContractModel({
  //   this.pTokenSymbol,
  //   this.pBalance,
  //   this.ptLogo,
  //   this.pHash,
  // });
}
