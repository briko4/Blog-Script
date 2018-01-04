console.log("conected");

// const banList = ["FLAP", "JPC", "CRB", "MC", "ERB", "EBZ", "MTLM3", "SNS", "DRS", "EMIGR", "BamitCoin", "TAT", "ACT", "OLV", "INF8", "UAEC", "SYC", "ICOO", "DTCT", "ZNA", "PZM", "ECC", "MIV", "EQB", "MOBI", "LTA", "TMT", "OPP", "ECHT", "REBL", "CRDS", "NTK", "MDL", "RBTC", "COFI", "KEX", "CVCOIN", "KCN", "NVST", "PRP", "GUESS", "CPAY", "AXT", "WSH", "MAG", "BOXY", "EARTH", "ILCT", "GAT", "GLA", "AERM", "ZEPH", "WHL", "TRIP", "SENSE", "AUT", "UTK", "MAT", "X8X", "NRO"< "FOOD", "RNDR", "LCASH", "ARBI", "NRN", "BMXT", "OROC", "BOG", "SQP", "WEB", "CJT", "MUT", "NRO", "VZT", "MSR", "XRED", "RUSTBITS", "FIL", "WAN", "DMT", "DLR", "ANTC", "BOTS", "DIM", "BULLS", "SPHTX", "SHP", "ABT", "ZAB", "C20", "MTN", "SMNX", "TTT", "XCJ", "FND", "CLOUT", "AID", "ADB", "CSTL", "XSB", "XCS", "EZM", "AMMO", "VNT", "ANCP", "SRT", "ATFS", "UTN", "STEX", "BDR", "MNZ", "MTK", "BT", "JDC", "SNK", "MASS", "BLOCKPAY", "KLK", "UP", "AUTH", "FOOD", "DUTCH", "ROCK", "TRIBE", "CABS", "SCOR", "DBR", "PYP", "EXY", "VOT", "WSC", "WYR", "EON", "CIX", "ZNT", "MNT", "AC3", "BTCL", "XUN", "xGOx", "JCR", "BITSD", "BOU", "MBT", "DRC", "RFL", "PCN", "TNB", "BNK", "JBY", "DFBT", "AMT", "3DES", "WPR", "GREA", "ICC", "JVY", "PYN", "AVA", "GEA", "ALQO", "AMIS"]
// // just a list of coins hat cause the next part - fetchData to crap out. cxorrect as of 24/12/2017

const data = []

const fetchData = function () {

  const baseURL = "https://api.coinmarketcap.com/v1/ticker/?limit=100"


  $.getJSON(baseURL).done(function (info) {
    // console.log("info is returned");
    // console.log(info);
    _(info).each(function (c) {
      console.log(c);
      // debugger;
      let c_obj = {
      symbol: c.symbol,
      price: c.price_usd,
      change24hour: c.percent_change_24h,
      supply: c.available_supply,
      totalvolume24h: c['24h_volume_usd'],
      mkcap: c.market_cap_usd

      }
      if (c_obj.mkcap < 1000000) {
        console.log("dont add smallest fish");
      } else if (c_obj.price < 0.1) {
        console.log("more small fish not added");
      } else {
        data.push(c_obj)
        // data.sort(compare);
      }


    });

    displayData(data)
  }).fail(function () {
    alert('Something bad happened');
  });

}; // end o fetchData


const displayData = function(data) {

    // data = data.sort(compare).slice().reverse();


  _(data).each(function (c_obj) {
    row = [
      `<tr>`,
      `<td>${c_obj.symbol}</td>`,
      `<td>${accounting.formatMoney(c_obj.price)}</td>`,
      `<td>${c_obj.change24hour}%</td>`,
      `<td>${accounting.formatMoney(c_obj.supply)}</td>`,
      `<td>${accounting.formatMoney(c_obj.totalvolume24h)}</td>`,
      `<td>${accounting.formatMoney(c_obj.mkcap)}</td>`,
      `</tr>`
    ]
    $('#data').find('tbody').append(row.join(''))
  })

}



$(document).ready(function() {
  console.log("document ready");

  $('#data').text(`loading data...`)

  fetchData()


})
