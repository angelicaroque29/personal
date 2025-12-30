import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, XCircle, TrendingUp, DollarSign, ShoppingCart, Home, ChevronDown, ChevronUp, Upload, Download } from 'lucide-react';

// Load PDF.js
const pdfjsLib = window['pdfjs-dist/build/pdf'];
if (pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

const BuyerReadinessReport = () => {
  const [targetPrice, setTargetPrice] = useState(300000);
  const [monthlyIncome, setMonthlyIncome] = useState(1855);
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const [transactions, setTransactions] = useState([
    { date: '11/08', amount: 7.13, category: 'Compras', merchant: 'Amazon' },
    { date: '11/08', amount: 19.38, category: 'Compras', merchant: 'Amazon' },
    { date: '11/15', amount: 430.69, category: 'Pago de Tarjeta', merchant: 'Pago' },
    { date: '11/28', amount: 496.91, category: 'Pago de Tarjeta', merchant: 'Pago' },
    { date: '11/29', amount: 39.46, category: 'Compras', merchant: 'Amazon' },
    { date: '11/07', amount: 20.00, category: 'Suscripciones', merchant: 'ChatGPT' },
    { date: '11/07', amount: 28.42, category: 'Gasolina', merchant: 'Chevron' },
    { date: '11/08', amount: 43.80, category: 'Comestibles', merchant: 'Whole Foods' },
    { date: '11/07', amount: 7.99, category: 'Entretenimiento', merchant: 'Dolphin' },
    { date: '11/10', amount: 23.76, category: 'Retail', merchant: 'Walgreens' },
    { date: '11/10', amount: 22.68, category: 'Retail', merchant: 'Walmart' },
    { date: '11/12', amount: 135.00, category: 'Fitness', merchant: 'Jiu Jitsu' },
    { date: '11/15', amount: 26.76, category: 'Retail', merchant: 'Walmart' },
    { date: '11/15', amount: 39.46, category: 'Compras', merchant: 'Amazon' },
    { date: '11/15', amount: 18.68, category: 'Comestibles', merchant: 'Whole Foods' },
    { date: '11/16', amount: 59.53, category: 'Compras', merchant: 'Bath & Body Works' },
    { date: '11/17', amount: 31.71, category: 'Gasolina', merchant: 'Chevron' },
    { date: '11/22', amount: 21.69, category: 'Retail', merchant: 'CVS' },
    { date: '11/22', amount: 117.49, category: 'Compras', merchant: 'Ross' },
    { date: '11/25', amount: 22.46, category: 'Compras', merchant: 'Amazon' },
    { date: '11/24', amount: 74.29, category: 'Compras', merchant: 'Ross' },
    { date: '11/25', amount: 34.65, category: 'Gasolina', merchant: 'Chevron' },
    { date: '11/26', amount: 12.67, category: 'Retail', merchant: 'Walmart' },
    { date: '11/29', amount: 139.09, category: 'Compras', merchant: 'Amazon' },
    { date: '11/29', amount: 134.75, category: 'Compras', merchant: 'Ross' },
    { date: '11/30', amount: 46.02, category: 'Compras', merchant: 'Ulta' },
    { date: '12/02', amount: 33.75, category: 'Compras', merchant: 'Groupon' },
    { date: '12/02', amount: 40.00, category: 'Médico', merchant: 'Orthopedic' },
  ]);

  const categorizeTransaction = (description) => {
    const desc = description.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
    
    // Pago de Tarjeta - debe ir primero
    if (desc.includes('payment') || desc.includes('thank you') || desc.includes('autopay')) {
      return 'Pago de Tarjeta';
    }
    
    // Restaurantes y Comida
    if (desc.includes('mcdonald') || desc.includes('burger king') || desc.includes('taco bell') || 
        desc.includes('subway') || desc.includes('pizza') || desc.includes('restaurant') ||
        desc.includes('cafe') || desc.includes('coffee') || desc.includes('starbucks') ||
        desc.includes('dunkin') || desc.includes('kfc') || desc.includes('wendy') ||
        desc.includes('chipotle') || desc.includes('panera') || desc.includes('chick fil a') ||
        desc.includes('domino') || desc.includes('papa john') || desc.includes('uber eats') ||
        desc.includes('doordash') || desc.includes('grubhub') || desc.includes('postmates') ||
        desc.includes('diner') || desc.includes('grill') || desc.includes('bistro') ||
        desc.includes('eatery') || desc.includes('culinary') || desc.includes('pollo tropical') ||
        desc.includes('five guys') || desc.includes('shake shack') || desc.includes('in n out') ||
        desc.includes('del taco') || desc.includes('qdoba') || desc.includes('panda express') ||
        desc.includes('sonic') || desc.includes('arby') || desc.includes('wingstop') ||
        desc.includes('buffalo wild') || desc.includes('olive garden') || desc.includes('applebee') ||
        desc.includes('chili') || desc.includes('red lobster') || desc.includes('outback')) {
      return 'Restaurantes/Comida';
    }
    
    // Comestibles/Supermercados - ACTUALIZADO CON FRESCO Y MAS
    if (desc.includes('whole foods') || desc.includes('publix') || desc.includes('kroger') ||
        desc.includes('safeway') || desc.includes('trader joe') || desc.includes('aldi') ||
        desc.includes('fresco y mas') || desc.includes('fresco') || desc.includes('sedano') ||
        desc.includes('winn dixie') || desc.includes('food lion') || desc.includes('giant') ||
        desc.includes('stop shop') || desc.includes('wegmans') || desc.includes('sprouts') ||
        desc.includes('fresh market') || desc.includes('lucky') || desc.includes('harris teeter') ||
        desc.includes('meijer') || desc.includes('heb') || desc.includes('h e b') ||
        desc.includes('albertsons') || desc.includes('vons') || desc.includes('jewel osco') ||
        desc.includes('shoprite') || desc.includes('shop rite') ||
        desc.includes('supermarket') || desc.includes('grocery') || desc.includes('market')) {
      return 'Comestibles';
    }
    
    // Gasolina
    if (desc.includes('chevron') || desc.includes('shell') || desc.includes('bp') ||
        desc.includes('exxon') || desc.includes('mobil') || desc.includes('texaco') ||
        desc.includes('gulf') || desc.includes('sunoco') || desc.includes('citgo') ||
        desc.includes('marathon') || desc.includes('speedway') || desc.includes('7 eleven') && desc.includes('gas') ||
        desc.includes('circle k') && desc.includes('gas') || desc.includes('wawa') && desc.includes('gas') ||
        desc.includes('gas station') || desc.includes('fuel') || desc.includes('petro')) {
      return 'Gasolina';
    }
    
    // Transporte
    if (desc.includes('uber') && !desc.includes('eats') || desc.includes('lyft') || 
        desc.includes('taxi') || desc.includes('parking') || desc.includes('toll') ||
        desc.includes('transit') || desc.includes('metro') || desc.includes('bus') ||
        desc.includes('zipcar') || desc.includes('car rental') || desc.includes('hertz') ||
        desc.includes('enterprise') || desc.includes('budget rent')) {
      return 'Transporte';
    }
    
    // Ropa y Moda - ACTUALIZADO CON EXPRESS
    if (desc.includes('express') && (desc.includes('hialeah') || desc.includes('store') || desc.includes('#')) || 
        desc.includes('h m') || desc.includes('zara') || 
        desc.includes('forever 21') || desc.includes('gap') || desc.includes('old navy') ||
        desc.includes('banana republic') || desc.includes('uniqlo') || desc.includes('j crew') ||
        desc.includes('american eagle') || desc.includes('hollister') || desc.includes('abercrombie') ||
        desc.includes('nike') || desc.includes('adidas') || desc.includes('footlocker') ||
        desc.includes('foot locker') || desc.includes('finish line') || desc.includes('dsw') ||
        desc.includes('famous footwear') || desc.includes('nordstrom') || desc.includes('macy') ||
        desc.includes('dillard') || desc.includes('bloomingdale') || desc.includes('saks') ||
        desc.includes('neiman marcus') || desc.includes('kohl') || desc.includes('jcpenney') ||
        desc.includes('jc penney') || desc.includes('sears') ||
        desc.includes('victoria secret') || desc.includes('pink') || desc.includes('lululemon') ||
        desc.includes('athleta') || desc.includes('under armour')) {
      return 'Ropa y Moda';
    }
    
    // Compras Online/General
    if (desc.includes('amazon') || desc.includes('amzn') || desc.includes('ebay') ||
        desc.includes('etsy') || desc.includes('groupon') || desc.includes('wish') ||
        desc.includes('aliexpress') || desc.includes('shein') || desc.includes('temu')) {
      return 'Compras';
    }
    
    // Tiendas de Descuento
    if (desc.includes('ross') || desc.includes('tj maxx') || desc.includes('tjmaxx') ||
        desc.includes('t j maxx') || desc.includes('marshalls') || desc.includes('burlington') ||
        desc.includes('dd s discount') || desc.includes('dds discount') ||
        desc.includes('century 21') || desc.includes('nordstrom rack')) {
      return 'Tiendas de Descuento';
    }
    
    // Belleza y Cuidado Personal
    if (desc.includes('ulta') || desc.includes('sephora') || desc.includes('sally beauty') ||
        desc.includes('bath body') || desc.includes('lush') ||
        desc.includes('the body shop') || desc.includes('mac cosmetics') || desc.includes('clinique')) {
      return 'Belleza y Cuidado';
    }
    
    // Hogar y Decoración
    if (desc.includes('homegoods') || desc.includes('home goods') || desc.includes('bed bath') ||
        desc.includes('container store') || desc.includes('ikea') || desc.includes('wayfair') ||
        desc.includes('pier 1') || desc.includes('pottery barn') || desc.includes('crate and barrel') ||
        desc.includes('west elm') || desc.includes('at home') || desc.includes('home depot') ||
        desc.includes('lowe s') || desc.includes('lowes') || desc.includes('menards') ||
        desc.includes('ace hardware')) {
      return 'Hogar y Decoración';
    }
    
    // Artesanía y Pasatiempos
    if (desc.includes('hobby lobby') || desc.includes('michaels') || desc.includes('joann') ||
        desc.includes('ac moore') || desc.includes('dick s sporting') || desc.includes('bass pro') ||
        desc.includes('cabela')) {
      return 'Pasatiempos';
    }
    
    // Retail General (Walmart, Target, etc) - MEJORADO PARA DETECTAR VARIACIONES
    if (desc.includes('walmart') || desc.includes('wal mart') || desc.includes('target') ||
        desc.includes('costco') || desc.includes('sam s club') || desc.includes('sams club') ||
        desc.includes('bj s') || desc.includes('best buy') ||
        desc.includes('staples') || desc.includes('office depot') || desc.includes('dollar tree') ||
        desc.includes('dollar general') || desc.includes('family dollar') || desc.includes('five below')) {
      return 'Retail';
    }
    
    // Farmacias
    if (desc.includes('walgreens') || desc.includes('cvs') || desc.includes('rite aid') ||
        desc.includes('duane reade') || desc.includes('pharmacy')) {
      return 'Farmacia';
    }
    
    // Suscripciones
    if (desc.includes('openai') || desc.includes('chatgpt') || desc.includes('netflix') ||
        desc.includes('spotify') || desc.includes('hulu') || desc.includes('disney') ||
        desc.includes('amazon prime') || desc.includes('youtube premium') || desc.includes('apple music') ||
        desc.includes('subscription') || desc.includes('apple com bill') ||
        desc.includes('microsoft') || desc.includes('adobe') || desc.includes('dropbox') ||
        desc.includes('google one') || desc.includes('icloud')) {
      return 'Suscripciones';
    }
    
    // Fitness/Salud
    if (desc.includes('jiu jitsu') || desc.includes('gym') || desc.includes('fitness') ||
        desc.includes('yoga') || desc.includes('planet fitness') || desc.includes('la fitness') ||
        desc.includes('24 hour fitness') || desc.includes('anytime fitness') ||
        desc.includes('crunch') || desc.includes('equinox') || desc.includes('crossfit') ||
        desc.includes('orangetheory') || desc.includes('soul cycle') ||
        desc.includes('peloton') || desc.includes('barre') || desc.includes('pilates')) {
      return 'Fitness';
    }
    
    // Médico
    if (desc.includes('doctor') || desc.includes('dr ') || desc.includes('orthopedic') || 
        desc.includes('medical') || desc.includes('hospital') || desc.includes('clinic') ||
        desc.includes('dental') || desc.includes('dentist') || desc.includes('health') || 
        desc.includes('lab') || desc.includes('urgent care') || desc.includes('kaiser') ||
        desc.includes('aetna') || desc.includes('blue cross') || desc.includes('cigna')) {
      return 'Médico';
    }
    
    // Entretenimiento
    if (desc.includes('dolphin') || desc.includes('cinema') || desc.includes('movie') ||
        desc.includes('theater') || desc.includes('amc') || desc.includes('regal') ||
        desc.includes('cinemark') || desc.includes('concert') || desc.includes('ticketmaster') ||
        desc.includes('stubhub') || desc.includes('entertainment') ||
        desc.includes('dave buster') || desc.includes('bowling') || desc.includes('arcade') ||
        desc.includes('zoo') || desc.includes('aquarium') || desc.includes('museum')) {
      return 'Entretenimiento';
    }
    
    // Gaming
    if (desc.includes('steam') || desc.includes('playstation') || desc.includes('xbox') ||
        desc.includes('nintendo') || desc.includes('gamestop') || desc.includes('game stop') ||
        desc.includes('epic games') || desc.includes('blizzard') || desc.includes('riot games')) {
      return 'Gaming';
    }
    
    // Utilities/Servicios
    if (desc.includes('electric') || desc.includes('fpl') || desc.includes('duke energy') ||
        desc.includes('water') || desc.includes('internet') || desc.includes('cable') ||
        desc.includes('phone') || desc.includes('att') || desc.includes('at t') ||
        desc.includes('verizon') || desc.includes('t mobile') || desc.includes('sprint') ||
        desc.includes('comcast') || desc.includes('xfinity') || desc.includes('spectrum') ||
        desc.includes('cox') || desc.includes('utility') || desc.includes('insurance')) {
      return 'Servicios/Utilities';
    }
    
    return 'Otros';
  };

  const parsePDF = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const typedarray = new Uint8Array(e.target.result);
          const pdf = await pdfjsLib.getDocument(typedarray).promise;
          let fullText = '';
          
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
          }
          
          resolve(fullText);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const parseTransactionsFromText = (text) => {
    const lines = text.split('\n');
    const newTransactions = [];
    
    // Pattern for dates (MM/DD format)
    const datePattern = /\b(\d{1,2}\/\d{1,2})\b/;
    // Pattern for money amounts
    const moneyPattern = /\$?(\d+\.\d{2})/g;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.length < 10) continue;
      
      // Look for date
      const dateMatch = line.match(datePattern);
      if (!dateMatch) continue;
      
      const date = dateMatch[1];
      
      // Look for merchant name (usually before amounts)
      let merchant = line.split(/\$?\d+\.\d{2}/)[0]
        .replace(datePattern, '')
        .trim()
        .substring(0, 40);
      
      // Extract amounts
      const amounts = [...line.matchAll(moneyPattern)].map(m => parseFloat(m[1]));
      if (amounts.length === 0) continue;
      
      // Use the first valid amount
      const amount = amounts.find(a => a > 0) || amounts[0];
      
      if (amount > 0 && merchant) {
        newTransactions.push({
          date: date,
          amount: Math.abs(amount),
          category: categorizeTransaction(merchant),
          merchant: merchant
        });
      }
    }
    
    return newTransactions;
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log('File selected:', file.name, file.type);

    let exportNode: HTMLElement | null = null;

    try {
      let newTransactions = [];
      
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        // Handle PDF
        console.log('Processing as PDF');
        const pdfText = await parsePDF(file);
        newTransactions = parseTransactionsFromText(pdfText);
      } else {
        // Handle CSV (default)
        console.log('Processing as CSV');
        const text = await file.text();
        const lines = text.split('\n');
        
        console.log('Total lines:', lines.length);
        console.log('First line (headers):', lines[0]);
        
        // Parse CSV with proper handling of quoted fields
        const parseCSVLine = (line) => {
          const result = [];
          let current = '';
          let inQuotes = false;
          
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              result.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          result.push(current.trim());
          return result;
        };

        // Get headers
        const headers = parseCSVLine(lines[0]);
        console.log('Headers:', headers);
        
        // Find column indices
        const dateIndex = headers.findIndex(h => h.toLowerCase() === 'transaction_date');
        const descIndex = headers.findIndex(h => h.toLowerCase() === 'description');
        const amountIndex = headers.findIndex(h => h.toLowerCase() === 'amount');
        
        console.log('Column indices:', { dateIndex, descIndex, amountIndex });
        
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          const parts = parseCSVLine(line);
          
          // Extract data using column indices
          const date = dateIndex >= 0 ? parts[dateIndex] : '';
          const description = descIndex >= 0 ? parts[descIndex] : '';
          const amountStr = amountIndex >= 0 ? parts[amountIndex] : '';
          
          // Parse amount (remove $ and commas, handle negatives)
          const cleanAmount = amountStr.replace(/[$,]/g, '');
          const amount = Math.abs(parseFloat(cleanAmount));
          
          if (description && amount > 0 && !description.toLowerCase().includes('balance')) {
            const category = categorizeTransaction(description);
            console.log('Found transaction:', { date, description, amount, category });
            
            newTransactions.push({
              date: date || 'N/A',
              amount: amount,
              category: category,
              merchant: description.substring(0, 40)
            });
          }
        }
      }

      console.log('Total transactions found:', newTransactions.length);

      if (newTransactions.length > 0) {
        setTransactions(newTransactions);
        alert(`✓ ${newTransactions.length} transacciones importadas exitosamente`);
      } else {
        alert('No se encontraron transacciones válidas. Revisa el formato del archivo.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar el archivo: ' + error.message);
    }
    
    // Reset input
    event.target.value = '';
  };

  const exportReport = async () => {
    const reportContent = document.getElementById('report-content');
    if (!reportContent) {
      alert('No se pudo encontrar el contenido del reporte.');
      return;
    }

    const win = window as any;
    const loadScript = (src, globalKey) => {
      if (win[globalKey]) {
        return Promise.resolve();
      }

      const existing = document.querySelector(`script[data-export-src="${src}"]`);
      if (existing) {
        return new Promise((resolve, reject) => {
          existing.addEventListener('load', resolve, { once: true });
          existing.addEventListener('error', () => reject(new Error('Load failed')), { once: true });
        });
      }

      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.dataset.exportSrc = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Load failed'));
        document.head.appendChild(script);
      });
    };

    try {
      await Promise.all([
        loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js', 'html2canvas'),
        loadScript('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js', 'jspdf'),
      ]);

      const html2canvas = win.html2canvas;
      const jsPDF = win.jspdf?.jsPDF;

      if (!html2canvas || !jsPDF) {
        alert('No se pudieron cargar las librerias para exportar PDF.');
        return;
      }

      const clonedContent = reportContent.cloneNode(true);
      if (!clonedContent || clonedContent.nodeType !== Node.ELEMENT_NODE) {
        alert('No se pudo preparar el reporte para exportar.');
        return;
      }

      exportNode = clonedContent as HTMLElement;
      exportNode.querySelectorAll('.no-print').forEach((el) => el.remove());
      exportNode.querySelectorAll('button').forEach((el) => el.remove());
      exportNode.querySelectorAll('input').forEach((input) => {
        const span = document.createElement('span');
        span.className = input.className.replace('border-b-2', '').replace('bg-transparent', '');
        span.textContent = input.value || '';
        span.style.fontWeight = 'bold';
        input.replaceWith(span);
      });

      exportNode.style.position = 'fixed';
      exportNode.style.left = '-10000px';
      exportNode.style.top = '0';
      exportNode.style.width = `${reportContent.offsetWidth}px`;
      exportNode.style.background = '#f8fafc';
      exportNode.style.padding = '24px';
      document.body.appendChild(exportNode);

      const canvas = await html2canvas(exportNode, {
        scale: 2,
        backgroundColor: '#f8fafc',
        useCORS: true,
        windowWidth: exportNode.scrollWidth,
        windowHeight: exportNode.scrollHeight,
      });

      const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'letter' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const fileDate = new Date().toISOString().slice(0, 10);
      pdf.save(`Evaluacion-Preparacion-Comprador-${fileDate}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Hubo un error al exportar el PDF. Intenta de nuevo.');
    } finally {
      if (exportNode?.parentNode) {
        exportNode.parentNode.removeChild(exportNode);
      }
    }
  };

  const categoryTotals = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const creditCardPayments = transactions
    .filter(t => t.category === 'Pago de Tarjeta')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalSpending = transactions.reduce((sum, t) => sum + t.amount, 0);
  const discretionarySpending = (categoryTotals['Compras'] || 0) + (categoryTotals['Entretenimiento'] || 0);
  
  const downPayment = targetPrice * 0.035;
  const loanAmount = targetPrice - downPayment;
  const interestRate = 0.07;
  const loanTermMonths = 360; // 30 years
  const monthlyRate = interestRate / 12;
  
  // Calculate monthly mortgage payment using proper formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]
  const monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) / 
                          (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
  
  const estimatedDTI = (monthlyMortgage / monthlyIncome) * 100;

  const getScore = () => {
    let score = 0;
    score += 15;
    score += 20;
    if (discretionarySpending < 300) score += 25;
    else if (discretionarySpending < 600) score += 15;
    else score += 5;
    score += 10;
    if (estimatedDTI < 30) score += 30;
    else if (estimatedDTI < 43) score += 20;
    else score += 10;
    return Math.round((score / 100) * 100);
  };

  const score = getScore();
  const readinessLevel = score >= 70 ? 'Listo' : score >= 50 ? 'Casi Listo' : 'Aún No Está Listo';
  const readinessColor = score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600';

  const chartData = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* PDF.js Script */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
      
      {/* Import/Export Buttons */}
      <div className="flex gap-3 mb-4 no-print">
        <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
          <Upload className="w-5 h-5" />
          <span>Importar Estado de Cuenta (PDF/CSV)</span>
          <input 
            type="file" 
            accept=".csv,.pdf,application/pdf,text/csv" 
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        <button 
          onClick={exportReport}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Download className="w-5 h-5" />
          <span>Exportar Reporte</span>
        </button>
      </div>

      <div id="report-content">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Evaluación de Preparación del Comprador</h1>
            <Home className="w-10 h-10 text-blue-600" />
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">Puntuación General de Preparación</p>
                <p className={`text-5xl font-bold ${readinessColor}`}>{score}/100</p>
                <p className={`text-xl font-semibold mt-2 ${readinessColor}`}>{readinessLevel}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Precio de Casa Objetivo</p>
                <input 
                  type="number" 
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  className="text-2xl font-bold text-blue-600 border-b-2 border-blue-300 bg-transparent text-right w-40"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                <p className="font-semibold text-gray-700">Ingreso Mensual</p>
              </div>
              <input 
                type="number" 
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="text-2xl font-bold text-blue-600 border-b-2 border-blue-300 bg-transparent w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Editable</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <ShoppingCart className="w-5 h-5 text-purple-600 mr-2" />
                <p className="font-semibold text-gray-700">Gasto Discrecional</p>
              </div>
              <p className="text-2xl font-bold text-purple-600">${discretionarySpending.toFixed(0)}</p>
              <p className="text-xs text-gray-500 mt-1">Por mes</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                <p className="font-semibold text-gray-700">Ratio DTI Estimado</p>
              </div>
              <p className="text-2xl font-bold text-green-600">{estimatedDTI.toFixed(1)}%</p>
              <p className="text-xs text-gray-500 mt-1">Meta: menos de 43%</p>
            </div>
          </div>

          {/* Chart */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-4">Top 6 Categorías de Gasto</h3>
            <div className="space-y-3">
              {chartData.map(([category, amount]) => (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                    <span className="text-sm font-bold text-gray-900">${amount.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500" 
                      style={{width: `${(amount / totalSpending) * 100}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
              Fortalezas
            </h2>
            <div className="space-y-2">
              <div className="flex items-start bg-green-50 p-3 rounded">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700"><strong>Pagos Regulares de Tarjeta de Crédito:</strong> Hace pagos consistentes de $430-$497/mes, mostrando responsabilidad financiera</p>
              </div>
              <div className="flex items-start bg-green-50 p-3 rounded">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700"><strong>Ingreso Activo:</strong> Ingreso mensual estimado alrededor de ${monthlyIncome.toFixed(0)} basado en patrones de pago</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <XCircle className="w-6 h-6 text-red-600 mr-2" />
              Señales de Alerta
            </h2>
            <div className="space-y-2">
              <div className="flex items-start bg-red-50 p-3 rounded">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700"><strong>Alto Gasto Discrecional:</strong> ${discretionarySpending.toFixed(0)}/mes en compras - esto es {((discretionarySpending/monthlyIncome)*100).toFixed(0)}% del ingreso estimado</p>
              </div>
              <div className="flex items-start bg-red-50 p-3 rounded">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700"><strong>Sin Patrón de Ahorro Visible:</strong> No hay depósitos o transferencias a cuentas de ahorro visibles en el estado de cuenta</p>
              </div>
              <div className="flex items-start bg-red-50 p-3 rounded">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700"><strong>Deuda de Tarjeta de Crédito:</strong> Mantener un balance que requiere $900+/mes en pagos sugiere obligaciones de deuda existentes</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-3">📋 Lo Que Necesitan Mejorar</h2>
            <ol className="space-y-3 list-decimal list-inside">
              <li className="text-gray-700">
                <strong>Reducir Gasto Discrecional en 50%:</strong> Reducir compras de retail de ${discretionarySpending.toFixed(0)}/mes a $300-400/mes. Esto ahorra $400-500/mes para el enganche.
              </li>
              <li className="text-gray-700">
                <strong>Empezar Ahorro Agresivo:</strong> Necesitan al menos ${downPayment.toFixed(0)} para enganche del 3.5% (FHA) + $8,000-12,000 para costos de cierre = ${(downPayment + 10000).toFixed(0)} total. Con ahorro de $500/mes, esto son {Math.ceil((downPayment + 10000)/500)} meses.
              </li>
              <li className="text-gray-700">
                <strong>Pagar Balance de Tarjeta de Crédito:</strong> Esos pagos de $900/mes sugieren $10,000+ en deuda de tarjeta. Enfocarse en pagar esto para mejorar el ratio DTI y el puntaje de crédito.
              </li>
              <li className="text-gray-700">
                <strong>Documentar Ingresos:</strong> Necesitan 2 años de declaraciones de impuestos y 2 talones de pago recientes. Si son trabajadores independientes, necesitan estados de ganancias y pérdidas.
              </li>
              <li className="text-gray-700">
                <strong>Construir Fondo de Emergencia:</strong> Los prestamistas quieren ver reservas de 2-3 meses después del cierre. Necesitan $3,000-5,000 adicionales en ahorros líquidos.
              </li>
            </ol>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-2">⏱️ Cronograma Realista</h3>
            <p className="text-gray-700">
              <strong>Si empieza hoy:</strong> Con recortes agresivos de gastos y ahorro consistente de $500/mes, su cliente podría estar listo para comprar en {Math.ceil((downPayment + 10000)/500)}-{Math.ceil((downPayment + 10000)/500) + 6} meses.
            </p>
          </div>
        </div>

        {/* Collapsible Transaction Table */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <button
            onClick={() => setIsTableExpanded(!isTableExpanded)}
            className="w-full flex items-center justify-between mb-4 text-left"
          >
            <h2 className="text-2xl font-bold text-gray-800">Detalle de Todas las Transacciones</h2>
            {isTableExpanded ? (
              <ChevronUp className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-600" />
            )}
          </button>

          {isTableExpanded && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Fecha</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Comerciante</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Categoría</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{t.date}</td>
                      <td className="border border-gray-300 px-4 py-2">{t.merchant}</td>
                      <td className="border border-gray-300 px-4 py-2">{t.category}</td>
                      <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                        ${t.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-blue-50 font-bold">
                    <td colSpan="3" className="border border-gray-300 px-4 py-2 text-right">
                      TOTAL:
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right text-blue-600 text-lg">
                      ${totalSpending.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>

              {/* Category Summary */}
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Resumen por Categoría</h3>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Categoría</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">% del Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(categoryTotals)
                      .sort((a, b) => b[1] - a[1])
                      .map(([category, amount]) => (
                        <tr key={category} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2 font-semibold">{category}</td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            ${amount.toFixed(2)}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            {((amount / totalSpending) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerReadinessReport;
