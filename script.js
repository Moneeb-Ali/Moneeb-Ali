// عند الضغط على زر "ارسم"
document.getElementById('plotButton').addEventListener('click', function() {
  const fun = document.getElementById('functionInput').value.trim();
  const rangeInput = document.getElementById('rangeInput').value.trim();

  // التأكد من إدخال النطاق بشكل صحيح (مثلاً: -10,10)
  const rangeVals = rangeInput.split(',');
  if (rangeVals.length !== 2) {
    alert('يرجى إدخال نطاق \(x\) بشكل صحيح، مثل: -10,10');
    return;
  }

  const xMin = parseFloat(rangeVals[0]);
  const xMax = parseFloat(rangeVals[1]);
  if (isNaN(xMin) || isNaN(xMax)) {
    alert('يرجى التأكد من أن حدود \(x\) هي أرقام');
    return;
  }

  // إعداد نقاط x وقيم y المناسبة
  const xValues = [];
  const yValues = [];
  const steps = 1000;
  const stepSize = (xMax - xMin) / steps;
  
  for (let x = xMin; x <= xMax; x += stepSize) {
    xValues.push(x);
    try {
      // استخدام Math.js لحساب y من الدالة المُدخلة
      const scope = { x: x };
      const y = math.evaluate(fun, scope);
      yValues.push(y);
    } catch (e) {
      // في حال وجود خطأ في الدالة، يتم تخزين القيمة null
      yValues.push(null);
    }
  }

  // رسم المنحنى باستخدام Plotly
  const trace = {
    x: xValues,
    y: yValues,
    mode: 'lines',
    type: 'scatter',
    line: {
      color: '#4CAF50',
      width: 2
    }
  };
  
  const layout = {
    title: 'رسم الدالة: ' + fun,
    xaxis: { title: 'x' },
    yaxis: { title: 'y' }
  };

  Plotly.newPlot('chart', [trace], layout);
});
