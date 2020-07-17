export default function (config) {
  return `&lt;script async src="http://analytics.wzmxx.com/resources/javascripts/wa.js"&gt;&lt;/script&gt;
&lt;script&gt;
    window.waData = window.waData || [];
    function waTag(){waData.push(arguments);}
    waTag('config', '${config}');
&lt;/script&gt;`
}
