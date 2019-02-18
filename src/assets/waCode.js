export default function (uniqueId) {
  return `&lt;script&gt;
var _wa= _wa || [ ];
_wa.push(['_setAccount', '${uniqueId}']);
(function() {
  var newScript = document.createElement('script');
  newScript.async = true;
  newScript.src = 'http://analytics.server.jessezhu.cn/resources/javascripts/wa.js';
  var firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(newScript, firstScript);
})();
&lt;/script&gt;`
}
