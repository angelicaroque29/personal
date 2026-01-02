import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, XCircle, TrendingUp, DollarSign, ShoppingCart, Home, ChevronDown, ChevronUp, Upload, Download, Info, X } from 'lucide-react';

const BuyerReadinessReport = () => {
  const [targetPrice, setTargetPrice] = useState(300000);
  const [monthlyIncome, setMonthlyIncome] = useState(1855);
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [dtiRatio, setDtiRatio] = useState(0);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoModalType, setInfoModalType] = useState('');
  const [reportMonths, setReportMonths] = useState(1);
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

  const loadPdfJs = () => {
    const win = window as any;
    if (win.pdfjsLib?.getDocument) {
      return Promise.resolve(win.pdfjsLib);
    }

    const existing = document.querySelector('script[data-pdfjs]');
    if (existing) {
      return new Promise((resolve, reject) => {
        existing.addEventListener('load', () => {
          if (win.pdfjsLib?.getDocument) {
            win.pdfjsLib.GlobalWorkerOptions.workerSrc =
              'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            resolve(win.pdfjsLib);
          } else {
            reject(new Error('PDF.js no está disponible.'));
          }
        }, { once: true });
        existing.addEventListener('error', () => reject(new Error('No se pudo cargar PDF.js.')), { once: true });
      });
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.async = true;
      script.dataset.pdfjs = 'true';
      script.onload = () => {
        if (!win.pdfjsLib?.getDocument) {
          reject(new Error('PDF.js no está disponible.'));
          return;
        }
        win.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve(win.pdfjsLib);
      };
      script.onerror = () => reject(new Error('No se pudo cargar PDF.js.'));
      document.head.appendChild(script);
    });
  };

  const buildLinesFromPdfItems = (items) => {
    const positionedItems = items
      .filter(item => item.str && String(item.str).trim().length > 0)
      .map(item => ({
        str: String(item.str),
        x: item.transform?.[4] ?? 0,
        y: item.transform?.[5] ?? 0,
      }))
      .sort((a, b) => {
        if (Math.abs(b.y - a.y) > 0.01) {
          return b.y - a.y;
        }
        return a.x - b.x;
      });

    if (!positionedItems.length) return [];

    const lines = [];
    const lineTolerance = 2.5;
    let currentLine = { y: positionedItems[0].y, items: [] };

    positionedItems.forEach(item => {
      if (Math.abs(item.y - currentLine.y) <= lineTolerance) {
        currentLine.items.push(item);
      } else {
        lines.push(currentLine);
        currentLine = { y: item.y, items: [item] };
      }
    });

    lines.push(currentLine);

    return lines
      .map(line => line.items
        .sort((a, b) => a.x - b.x)
        .map(item => item.str)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim())
      .filter(Boolean);
  };

  const parsePDF = async (file) => {
    const pdfjsLib = await loadPdfJs();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const typedarray = new Uint8Array(e.target.result);
          const loadingTask = pdfjsLib.getDocument({
            data: typedarray,
            useWorkerFetch: false,
            isEvalSupported: false,
            useSystemFonts: true
          });
          
          const pdf = await loadingTask.promise;
          let fullText = '';
          const allLines = [];
          
          console.log('PDF loaded, total pages:', pdf.numPages);
          
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageLines = buildLinesFromPdfItems(textContent.items || []);
            allLines.push(...pageLines);
            fullText += `${pageLines.join('\n')}\n`;
          }
          
          console.log('PDF text extracted, length:', fullText.length);
          resolve({ text: fullText, lines: allLines });
        } catch (error) {
          console.error('PDF parsing error:', error);
          reject(error);
        }
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const parseTransactionsFromText = (text) => {
    const lines = text.split('\n');
    const newTransactions = [];
    
    console.log('PDF Text extracted, total lines:', lines.length);
    
    // Pattern for dates (MM/DD format)
    const datePattern = /^(\d{2}\/\d{2})\s+/;
    // Pattern for money amounts with optional negative sign
    const moneyPattern = /-?\$?\s*(\d{1,3}(?:,?\d{3})*\.\d{2})/;
    
    let inTransactionSection = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Detect start of transaction sections
      if (line.includes('PAYMENTS AND OTHER CREDITS') || 
          line.includes('PURCHASE') || 
          line.includes('ACCOUNT ACTIVITY')) {
        inTransactionSection = true;
        console.log('Found transaction section at line', i);
        continue;
      }
      
      // Stop at interest charges section
      if (line.includes('INTEREST CHARGES') || line.includes('2025 Totals')) {
        inTransactionSection = false;
        continue;
      }
      
      // Skip header lines
      if (line.includes('Date of Transaction') || 
          line.includes('Merchant Name') ||
          line.includes('$ Amount')) {
        continue;
      }
      
      // Try to match transaction line: MM/DD Description Amount
      const dateMatch = line.match(datePattern);
      if (!dateMatch) continue;
      
      const date = dateMatch[1];
      
      // Get the rest of the line after date
      const restOfLine = line.substring(dateMatch[0].length).trim();
      
      // Find the last occurrence of a money amount
      const amountMatches = [...restOfLine.matchAll(/-?\$?\s*(\d{1,3}(?:,?\d{3})*\.\d{2})/g)];
      if (amountMatches.length === 0) continue;
      
      // The last match is the amount
      const lastMatch = amountMatches[amountMatches.length - 1];
      const amountStr = lastMatch[0];
      const amount = Math.abs(parseFloat(amountStr.replace(/[$,\s]/g, '')));
      
      // Extract merchant - everything before the last amount
      const amountIndex = restOfLine.lastIndexOf(amountStr);
      let merchant = restOfLine.substring(0, amountIndex).trim();
      
      // Clean up merchant name
      merchant = merchant
        .replace(/\s+/g, ' ')
        .replace(/^[-\s]+|[-\s]+$/g, '')
        .substring(0, 60);
      
      if (amount > 0 && merchant && merchant.length > 2) {
        // Skip "Payment Thank You" as these are credits/payments
        if (merchant.toLowerCase().includes('payment thank you')) {
          const category = 'Pago de Tarjeta';
          console.log('Found payment:', { date, merchant, amount, category });
          newTransactions.push({
            date: date,
            amount: amount,
            category: category,
            merchant: merchant
          });
        } else {
          const category = categorizeTransaction(merchant);
          console.log('Found transaction:', { date, merchant, amount, category });
          newTransactions.push({
            date: date,
            amount: amount,
            category: category,
            merchant: merchant
          });
        }
      }
    }
    
    // If we still didn't find transactions, try a more aggressive approach
    if (newTransactions.length === 0) {
      console.log('Trying aggressive parsing method...');
      
      // Look for common patterns in credit card statements
      const patterns = [
        // Pattern: MM/DD text amount
        /(\d{2}\/\d{2})\s+([A-Za-z0-9\s\-#\.&*'()]+?)\s+(-?\$?\s*\d{1,3}(?:,?\d{3})*\.\d{2})\s*$/gm,
        // Pattern for lines with location
        /(\d{2}\/\d{2})\s+([A-Za-z0-9\s\-#\.&*'()]+[A-Z]{2})\s+(-?\$?\s*\d{1,3}(?:,?\d{3})*\.\d{2})/gm
      ];
      
      for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(text)) !== null) {
          const date = match[1];
          let merchant = match[2].trim().substring(0, 60);
          const amountStr = match[3];
          const amount = Math.abs(parseFloat(amountStr.replace(/[$,\s-]/g, '')));
          
          if (amount > 0 && amount < 100000 && merchant.length > 2) {
            const category = categorizeTransaction(merchant);
            console.log('Found transaction (aggressive):', { date, merchant, amount, category });
            
            // Avoid duplicates
            const isDuplicate = newTransactions.some(t => 
              t.date === date && t.merchant === merchant && t.amount === amount
            );
            
            if (!isDuplicate) {
              newTransactions.push({
                date: date,
                amount: amount,
                category: category,
                merchant: merchant
              });
            }
          }
        }
        
        if (newTransactions.length > 0) break;
      }
    }
    
    console.log('Total transactions found:', newTransactions.length);
    return newTransactions;
  };

  const formatMonthDate = (dateString) => {
    const monthMap = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Sept: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };

    const match = dateString.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\s+(\d{1,2}),\s+\d{4}/);
    if (!match) return dateString.trim();

    const month = monthMap[match[1]] || '01';
    const day = String(match[2]).padStart(2, '0');
    return `${month}/${day}`;
  };

  const parseTransactionsFromLines = (lines) => {
    const transactions = [];
    const monthToken = '(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)';
    const dateStartRegex = new RegExp(`^${monthToken}\\s+\\d{1,2},\\s+\\d{4}`);
    const dateAnywhereRegex = new RegExp(`^${monthToken}\\s+\\d{1,2},\\s+\\d{4}`);

    for (const rawLine of lines) {
      const line = rawLine.replace(/\s+/g, ' ').trim();
      if (!line) continue;

      const upperLine = line.toUpperCase();
      if (upperLine.startsWith('TOTAL') || upperLine.includes('SPENDING BY CATEGORY')) {
        continue;
      }

      if (upperLine.includes('TRANSACTION DATE') && upperLine.includes('DESCRIPTION') && upperLine.includes('AMOUNT')) {
        continue;
      }

      if (!dateStartRegex.test(line)) {
        continue;
      }

      const amountMatch = line.match(/-?\$?\d[\d,]*\.\d{2}\s*$/);
      if (!amountMatch) continue;

      const amount = Math.abs(parseFloat(amountMatch[0].replace(/[$,\s]/g, '')));
      if (!Number.isFinite(amount) || amount <= 0) continue;

      const lineWithoutAmount = line.slice(0, amountMatch.index).trim();
      const firstDateMatch = lineWithoutAmount.match(dateAnywhereRegex);
      if (!firstDateMatch) continue;

      const remainingAfterFirstDate = lineWithoutAmount.slice(firstDateMatch[0].length).trim();
      const secondDateMatch = remainingAfterFirstDate.match(dateAnywhereRegex);

      const description = secondDateMatch
        ? remainingAfterFirstDate.slice(secondDateMatch[0].length).trim()
        : remainingAfterFirstDate.trim();

      if (!description) continue;

      const date = formatMonthDate(firstDateMatch[0]);
      const merchant = description.substring(0, 60);
      const category = categorizeTransaction(merchant);

      transactions.push({
        date,
        amount,
        category,
        merchant,
      });
    }

    return transactions;
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log('File selected:', file.name, file.type);

    setIsLoading(true);
    setLoadingMessage('Procesando archivo...');

    try {
      let newTransactions = [];
      
      // Check if it's an image or PDF
      const isImage = file.type.startsWith('image/');
      const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      const isCSV = file.name.toLowerCase().endsWith('.csv') || file.type === 'text/csv';
      
      if (isCSV) {
        // Handle CSV directly
        console.log('Processing as CSV');
        setLoadingMessage('Leyendo archivo CSV...');
        newTransactions = await parseCSV(file);
      } else if (isPDF) {
        // Parse PDF locally and convert to CSV format
        console.log('Processing as PDF to CSV');
        setLoadingMessage('Leyendo archivo PDF...');
        newTransactions = await parsePDFToCSV(file);
      } else if (isImage) {
        // Use Claude API to extract transactions from image
        console.log('Processing as Image with Claude Vision API');
        setLoadingMessage('🤖 Analizando documento con IA...');
        
        try {
          newTransactions = await extractTransactionsWithClaude(file, false);
        } catch (error) {
          console.error('Claude API error:', error);
          setIsLoading(false);
          alert('❌ Error al analizar el documento. Por favor intenta con un archivo CSV o una imagen más clara.\n\nError: ' + error.message);
          event.target.value = '';
          return;
        }
      } else {
        setIsLoading(false);
        alert('⚠️ Formato no soportado. Por favor sube un archivo CSV, PDF o imagen (JPG/PNG).');
        event.target.value = '';
        return;
      }

      console.log('Total transactions found:', newTransactions.length);

      if (newTransactions.length > 0) {
        setLoadingMessage('Categorizando transacciones...');
        await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for UX
        setTransactions(newTransactions);
        setIsLoading(false);
        alert(`✅ ${newTransactions.length} transacciones importadas exitosamente`);
      } else {
        setIsLoading(false);
        alert('⚠️ No se encontraron transacciones válidas. Revisa el formato del archivo.');
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      alert('❌ Error al procesar el archivo: ' + error.message);
    }
    
    // Reset input
    event.target.value = '';
  };

  const parseCSVLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
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

  const parseCSVText = (text) => {
    const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
    
    console.log('Total lines:', lines.length);
    if (lines.length === 0) return [];
    
    const headers = parseCSVLine(lines[0]).map(header => header.toLowerCase());
    const dateIndex = headers.findIndex(h => h.includes('date') || h.includes('fecha'));
    const descIndex = headers.findIndex(h => h.includes('description') || h.includes('merchant') || h.includes('descripcion') || h.includes('comerciante'));
    const amountIndex = headers.findIndex(h => h.includes('amount') || h.includes('monto') || h.includes('importe'));
    
    if (dateIndex === -1 || descIndex === -1 || amountIndex === -1) {
      throw new Error('CSV debe tener columnas: Date, Description/Merchant, Amount');
    }
    
    const transactions = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const parts = parseCSVLine(line);
      const date = parts[dateIndex] || '';
      const description = parts[descIndex] || '';
      const amountStr = parts[amountIndex] || '';
      const amount = Math.abs(parseFloat(amountStr.replace(/[$,]/g, '')));
      
      if (description && amount > 0 && !description.toLowerCase().includes('balance')) {
        transactions.push({
          date: date || 'N/A',
          amount: amount,
          category: categorizeTransaction(description),
          merchant: description.substring(0, 40)
        });
      }
    }
    
    return transactions;
  };

  const parseCSV = async (file) => {
    const text = await file.text();
    return parseCSVText(text);
  };

  const escapeCsvValue = (value) => {
    const safeValue = value == null ? '' : String(value);
    if (/[",\n]/.test(safeValue)) {
      return `"${safeValue.replace(/"/g, '""')}"`;
    }
    return safeValue;
  };

  const transactionsToCSV = (transactions) => {
    const header = ['Date', 'Description', 'Amount'];
    const rows = transactions.map((transaction) => {
      const date = escapeCsvValue(transaction.date || '');
      const description = escapeCsvValue(transaction.merchant || '');
      const amount = Number.isFinite(transaction.amount)
        ? transaction.amount.toFixed(2)
        : '';
      return `${date},${description},${amount}`;
    });
    return [header.join(','), ...rows].join('\n');
  };

  const parsePDFToCSV = async (file) => {
    const { text, lines } = await parsePDF(file);
    let extractedTransactions = parseTransactionsFromLines(lines);

    if (!extractedTransactions.length) {
      extractedTransactions = parseTransactionsFromText(text);
    }
    
    if (!extractedTransactions.length) {
      throw new Error('No se encontraron transacciones en el PDF. Intenta exportar como CSV desde tu banco.');
    }
    
    const csvText = transactionsToCSV(extractedTransactions);
    return parseCSVText(csvText);
  };

  const extractTransactionsWithClaude = async (file, isPDF) => {
    // Convert file to base64
    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const mediaType = isPDF ? 'application/pdf' : file.type;

    // Call Claude API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: isPDF ? "document" : "image",
                source: {
                  type: "base64",
                  media_type: mediaType,
                  data: base64Data
                }
              },
              {
                type: "text",
                text: `Analiza este estado de cuenta bancario completo y extrae TODAS las transacciones de gasto.

IMPORTANTE: 
- Este documento puede tener CIENTOS de transacciones en múltiples páginas
- Extrae CADA transacción individual, no resúmenes
- NO incluyas "Payment Thank You" ni créditos/pagos de tarjeta
- Solo incluye GASTOS reales (compras, servicios, etc.)

Para CADA transacción, extrae:
- Fecha en formato MM/DD
- Nombre del comerciante/descripción
- Monto como número positivo

Si ves categorías como "SHOPPING: Total $4,089.46" con transacciones debajo, extrae CADA transacción individual, NO el total.

Ejemplo de lo que necesito:
- "Jan 06, 2025 - AMAZON MKTPL*ZP88G15B1 - $13.90" ✅
- "SHOPPING: $4,089.46" ❌ (esto es un total, no una transacción)

Responde ÚNICAMENTE con un JSON array. Sin texto adicional, sin explicaciones:

[
  {"date": "01/06", "merchant": "AMAZON MKTPL*ZP88G15B1", "amount": 13.90},
  {"date": "01/07", "merchant": "BATH & BODY WORKS 3885", "amount": 28.83},
  ...
]

CRÍTICO: Extrae TODAS las transacciones que veas en el documento, incluso si son cientos. No omitas ninguna.`
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API Error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Claude API response:', data);

    // Extract JSON from response
    const textContent = data.content.find(c => c.type === 'text')?.text || '';
    
    // Remove markdown code blocks if present
    let jsonText = textContent.trim();
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```json?\n?/g, '').replace(/```\n?$/g, '').trim();
    }

    let transactionsData;
    try {
      transactionsData = JSON.parse(jsonText);
    } catch (e) {
      console.error('Failed to parse JSON:', jsonText);
      throw new Error('No se pudo extraer las transacciones del documento. El formato del PDF puede ser muy complejo. Intenta exportar como CSV desde tu banco.');
    }

    if (!Array.isArray(transactionsData) || transactionsData.length === 0) {
      throw new Error('No se encontraron transacciones en el documento.');
    }

    // Convert to our format and categorize
    const transactions = transactionsData.map(t => ({
      date: t.date,
      amount: t.amount,
      category: categorizeTransaction(t.merchant),
      merchant: t.merchant.substring(0, 60)
    }));

    return transactions;
  };

  const exportReport = () => {
    // Create a clean HTML version of the report
    const reportContent = document.getElementById('report-content');
    if (!reportContent) return;
    
    const clonedContent = reportContent.cloneNode(true);
    
    // Remove no-print elements
    const noPrintElements = clonedContent.querySelectorAll('.no-print');
    noPrintElements.forEach(el => el.remove());
    
    // Replace input fields with static text
    const inputs = clonedContent.querySelectorAll('input');
    inputs.forEach(input => {
      const span = document.createElement('span');
      span.className = 'font-bold text-2xl';
      span.textContent = input.value;
      span.style.color = input.className.includes('blue') ? '#2563eb' : 
                         input.className.includes('purple') ? '#9333ea' : '#059669';
      input.parentNode.replaceChild(span, input);
    });
    
    // Remove info buttons
    const infoButtons = clonedContent.querySelectorAll('button');
    infoButtons.forEach(btn => {
      if (btn.querySelector('svg') && btn.title === 'Ver información') {
        btn.remove();
      }
    });
    
    // Generate HTML document
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Evaluación de Preparación del Comprador - ${new Date().toLocaleDateString()}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 40px;
      background: white;
      color: #1f2937;
      line-height: 1.6;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { color: #1e40af; font-size: 32px; margin-bottom: 24px; border-bottom: 3px solid #3b82f6; padding-bottom: 12px; }
    h2 { color: #1f2937; font-size: 22px; margin-top: 32px; margin-bottom: 16px; }
    h3 { color: #374151; font-size: 18px; margin-top: 20px; margin-bottom: 12px; }
    
    table { 
      border-collapse: collapse; 
      width: 100%; 
      margin: 16px 0;
      border: 1px solid #d1d5db;
    }
    th, td { 
      border: 1px solid #d1d5db; 
      padding: 12px; 
      text-align: left;
      font-size: 13px;
    }
    th { 
      background-color: #f3f4f6;
      font-weight: 600;
      color: #374151;
    }
    tbody tr:nth-child(even) { background-color: #f9fafb; }
    
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 24px 0; }
    .card { padding: 16px; border-radius: 8px; }
    .bg-blue-50 { background-color: #eff6ff; }
    .bg-purple-50 { background-color: #faf5ff; }
    .bg-green-50 { background-color: #f0fdf4; }
    .bg-red-50 { background-color: #fef2f2; }
    .bg-yellow-50 { background-color: #fefce8; }
    .bg-gradient { background: linear-gradient(to right, #eff6ff, #dbeafe); padding: 24px; border-radius: 8px; margin: 24px 0; }
    
    .text-blue-600 { color: #2563eb; }
    .text-purple-600 { color: #9333ea; }
    .text-green-600 { color: #059669; }
    .text-red-600 { color: #dc2626; }
    .text-yellow-600 { color: #d97706; }
    .text-gray-600 { color: #4b5563; }
    .text-gray-700 { color: #374151; }
    .text-gray-800 { color: #1f2937; }
    
    .font-bold { font-weight: 700; }
    .font-semibold { font-weight: 600; }
    .text-xs { font-size: 0.75rem; }
    .text-sm { font-size: 0.875rem; }
    .text-xl { font-size: 1.25rem; }
    .text-2xl { font-size: 1.5rem; }
    .text-3xl { font-size: 1.875rem; }
    .text-5xl { font-size: 3rem; }
    
    .mb-2 { margin-bottom: 8px; }
    .mb-3 { margin-bottom: 12px; }
    .mb-4 { margin-bottom: 16px; }
    .mb-6 { margin-bottom: 24px; }
    .mt-1 { margin-top: 4px; }
    .mt-2 { margin-top: 8px; }
    .mt-4 { margin-top: 16px; }
    .p-3 { padding: 12px; }
    .p-4 { padding: 16px; }
    
    .rounded { border-radius: 8px; }
    .border-l-4 { border-left: 4px solid; }
    .border-yellow-500 { border-color: #eab308; }
    
    .flex { display: flex; }
    .items-start { align-items: flex-start; }
    .items-center { align-items: center; }
    .gap-2 { gap: 8px; }
    .space-y-2 > * + * { margin-top: 8px; }
    .space-y-3 > * + * { margin-top: 12px; }
    
    ol { padding-left: 24px; margin: 16px 0; }
    ol li { margin-bottom: 12px; line-height: 1.7; }
    
    @media print {
      body { padding: 20px; }
      @page { margin: 0.5in; }
    }
  </style>
</head>
<body>
  <div class="container">
    ${clonedContent.innerHTML}
  </div>
</body>
</html>`;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Evaluacion-Comprador-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('✅ Reporte descargado como HTML. Abre el archivo y usa Ctrl+P (o Cmd+P) para guardar como PDF.');
  };

  const essentialCategories = new Set([
    'Comestibles',
    'Gasolina',
    'Servicios/Utilities',
    'Médico',
    'Farmacia',
    'Transporte',
  ]);

  const periodMonths = Math.max(1, Math.round(Number(reportMonths) || 1));

  const spendingTransactions = transactions.filter(t => t.category !== 'Pago de Tarjeta');

  const categoryTotals = spendingTransactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const creditCardPayments = transactions
    .filter(t => t.category === 'Pago de Tarjeta')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalTransactionsAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalSpending = spendingTransactions.reduce((sum, t) => sum + t.amount, 0);

  const discretionaryCategoryEntries = Object.entries(categoryTotals)
    .filter(([category, amount]) => amount > 0 && !essentialCategories.has(category))
    .sort((a, b) => b[1] - a[1]);

  const discretionarySpending = discretionaryCategoryEntries.reduce((sum, [, amount]) => sum + amount, 0);

  const discretionaryBreakdown = (() => {
    const top = discretionaryCategoryEntries.slice(0, 5);
    const remainingTotal = discretionaryCategoryEntries
      .slice(5)
      .reduce((sum, [, amount]) => sum + amount, 0);

    if (remainingTotal > 0) {
      return [...top, ['Otros gastos', remainingTotal]];
    }

    return top;
  })();

  const totalSpendingMonthly = totalSpending / periodMonths;
  const creditCardPaymentsMonthly = creditCardPayments / periodMonths;
  const categoryTotalsMonthly = Object.fromEntries(
    Object.entries(categoryTotals).map(([category, amount]) => [category, amount / periodMonths]),
  );
  const discretionarySpendingMonthly = discretionarySpending / periodMonths;
  const discretionaryBreakdownMonthly = discretionaryBreakdown.map(([category, amount]) => [
    category,
    amount / periodMonths,
  ]);
  const categoryTotalsForDisplay = periodMonths > 1 ? categoryTotalsMonthly : categoryTotals;
  const totalSpendingForDisplay = periodMonths > 1 ? totalSpendingMonthly : totalSpending;
  const periodLabel = periodMonths > 1 ? 'Promedio mensual' : 'Por mes';
  
  const downPayment = targetPrice * 0.035;
  const loanAmount = targetPrice - downPayment;
  const interestRate = 0.07;
  const loanTermMonths = 360; // 30 years
  const monthlyRate = interestRate / 12;
  
  // Calculate monthly mortgage payment using proper formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]
  const monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) / 
                          (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
  
  // DTI should include mortgage + existing debt payments divided by gross monthly income
  // Estimate monthly debt from credit card payments (they're paying off debt)
  const estimatedMonthlyDebt = creditCardPaymentsMonthly > 0 ? creditCardPaymentsMonthly : 0;
  const totalMonthlyDebt = monthlyMortgage + estimatedMonthlyDebt;
  
  const estimatedDTI = monthlyIncome > 0 ? (totalMonthlyDebt / monthlyIncome) * 100 : 0;
  
  // Update DTI when values change
  useEffect(() => {
    console.log('DTI Calculation:', {
      monthlyIncome,
      monthlyMortgage: monthlyMortgage.toFixed(2),
      estimatedMonthlyDebt: estimatedMonthlyDebt.toFixed(2),
      totalMonthlyDebt: totalMonthlyDebt.toFixed(2),
      calculatedDTI: estimatedDTI.toFixed(1) + '%'
    });
    setDtiRatio(estimatedDTI);
  }, [targetPrice, monthlyIncome, transactions, reportMonths]);

  const getScore = () => {
    let score = 0;
    
    // Has active income (15 points)
    if (monthlyIncome > 1000) score += 15;
    
    // Makes credit card payments (20 points)
    if (creditCardPaymentsMonthly > 0) score += 20;
    
    // Discretionary spending control (25 points)
    const discretionaryPercentage = monthlyIncome > 0 ? (discretionarySpendingMonthly / monthlyIncome) * 100 : 100;
    if (discretionaryPercentage < 20) score += 25;
    else if (discretionaryPercentage < 40) score += 15;
    else score += 5;
    
    // Has transactions showing activity (10 points)
    if (transactions.length > 5) score += 10;
    
    // DTI ratio quality (30 points)
    if (dtiRatio < 30) score += 30;
    else if (dtiRatio < 43) score += 20;
    else if (dtiRatio < 50) score += 10;
    else score += 5;
    
    return Math.min(100, Math.round(score));
  };

  const score = getScore();
  const readinessLevel = score >= 70 ? 'Listo' : score >= 50 ? 'Casi Listo' : 'Aún No Está Listo';
  const readinessColor = score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600';

  // Dynamic strengths based on actual data
  const getStrengths = () => {
    const strengths = [];
    
    if (creditCardPaymentsMonthly > 0) {
      strengths.push({
        text: `Pagos Regulares de Tarjeta de Crédito: Hace pagos consistentes de ${creditCardPaymentsMonthly.toFixed(0)}/mes, mostrando responsabilidad financiera`
      });
    }
    
    if (monthlyIncome > 0) {
      strengths.push({
        text: `Ingreso Activo: Ingreso mensual de ${monthlyIncome.toFixed(0)}`
      });
    }
    
    const discretionaryPercentage = totalSpendingMonthly > 0 ? (discretionarySpendingMonthly / totalSpendingMonthly) * 100 : 0;
    
    if (discretionaryPercentage < 30) {
      strengths.push({
        text: `Control de Gastos: Solo ${discretionaryPercentage.toFixed(0)}% del gasto es discrecional, mostrando disciplina financiera`
      });
    }
    
    if (dtiRatio < 43) {
      strengths.push({
        text: `Ratio DTI Saludable: ${dtiRatio.toFixed(1)}% está dentro del rango aceptable para préstamos hipotecarios`
      });
    }
    
    if (strengths.length === 0) {
      strengths.push({
        text: `Actividad Financiera: Tiene ${transactions.length} transacciones registradas mostrando actividad bancaria`
      });
    }
    
    return strengths;
  };

  // Dynamic red flags based on actual data
  const getRedFlags = () => {
    const flags = [];
    
    const discretionaryPercentage = monthlyIncome > 0 ? (discretionarySpendingMonthly / monthlyIncome) * 100 : 0;
    
    if (discretionaryPercentage > 40) {
      flags.push({
        text: `Alto Gasto Discrecional: ${discretionarySpendingMonthly.toFixed(0)}/mes en gastos discrecionales - esto es ${discretionaryPercentage.toFixed(0)}% del ingreso`
      });
    }
    
    // Check for savings pattern
    const hasSavingsTransactions = transactions.some(t => 
      t.merchant.toLowerCase().includes('savings') || 
      t.merchant.toLowerCase().includes('transfer') ||
      t.category === 'Ahorros'
    );
    
    if (!hasSavingsTransactions) {
      flags.push({
        text: `Sin Patrón de Ahorro Visible: No hay depósitos o transferencias a cuentas de ahorro visibles en las transacciones`
      });
    }
    
    if (creditCardPaymentsMonthly > monthlyIncome * 0.3) {
      flags.push({
        text: `Deuda de Tarjeta de Crédito: Pagos de ${creditCardPaymentsMonthly.toFixed(0)}/mes sugieren deuda significativa que afecta la capacidad de ahorro`
      });
    }
    
    if (dtiRatio > 43) {
      flags.push({
        text: `Ratio DTI Alto: ${dtiRatio.toFixed(1)}% excede el límite estándar del 43% para préstamos convencionales`
      });
    }
    
    if (monthlyIncome < 2000) {
      flags.push({
        text: `Ingreso Limitado: ${monthlyIncome.toFixed(0)}/mes puede ser insuficiente para cubrir hipoteca, deudas y gastos`
      });
    }
    
    // Check for high recurring subscriptions
    const subscriptionTotal = categoryTotalsMonthly['Suscripciones'] || 0;
    if (subscriptionTotal > 100) {
      flags.push({
        text: `Suscripciones Elevadas: ${subscriptionTotal.toFixed(0)}/mes en suscripciones - considera cancelar las no esenciales`
      });
    }
    
    if (flags.length === 0) {
      flags.push({
        text: `Documentación Necesaria: Necesita preparar 2 años de declaraciones de impuestos y talones de pago recientes`
      });
    }
    
    return flags;
  };

  // Dynamic improvement recommendations
  const getImprovements = () => {
    const improvements = [];
    const discretionaryPercentage = monthlyIncome > 0 ? (discretionarySpendingMonthly / monthlyIncome) * 100 : 0;
    
    // 1. Reduce discretionary spending
    if (discretionaryPercentage > 30) {
      const targetSpending = monthlyIncome * 0.20; // 20% target
      const potentialSavings = discretionarySpendingMonthly - targetSpending;
      improvements.push(
        `Reducir Gasto Discrecional: Reducir gastos discrecionales de ${discretionarySpendingMonthly.toFixed(0)}/mes a ${targetSpending.toFixed(0)}/mes. Esto ahorra ${potentialSavings.toFixed(0)}/mes para el enganche.`
      );
    }
    
    // 2. Start aggressive savings
    const neededForDownPayment = downPayment + 10000; // Down payment + closing costs
    const currentSavingsCapacity = monthlyIncome - totalSpendingMonthly;
    const monthsToSave = currentSavingsCapacity > 0 ? Math.ceil(neededForDownPayment / currentSavingsCapacity) : 999;
    
    improvements.push(
      `Empezar Ahorro Agresivo: Necesitan al menos ${downPayment.toFixed(0)} para enganche del 3.5% (FHA) + $8,000-12,000 para costos de cierre = ${neededForDownPayment.toFixed(0)} total. ${currentSavingsCapacity > 0 ? `Con ahorro de ${currentSavingsCapacity.toFixed(0)}/mes, esto son ${monthsToSave} meses.` : 'Necesita aumentar ingresos o reducir gastos para poder ahorrar.'}`
    );
    
    // 3. Pay down credit card debt
    if (creditCardPaymentsMonthly > 0) {
      improvements.push(
        `Pagar Balance de Tarjeta de Crédito: Esos pagos de ${creditCardPaymentsMonthly.toFixed(0)}/mes sugieren deuda significativa. Enfocarse en pagar esto para mejorar el ratio DTI y el puntaje de crédito.`
      );
    }
    
    // 4. Document income
    improvements.push(
      `Documentar Ingresos: Necesitan 2 años de declaraciones de impuestos y 2 talones de pago recientes. Si son trabajadores independientes, necesitan estados de ganancias y pérdidas.`
    );
    
    // 5. Build emergency fund
    const emergencyFundNeeded = monthlyMortgage * 3; // 3 months reserves
    improvements.push(
      `Construir Fondo de Emergencia: Los prestamistas quieren ver reservas de 2-3 meses después del cierre. Necesitan ${emergencyFundNeeded.toFixed(0)} adicionales en ahorros líquidos.`
    );
    
    return improvements;
  };

  const openInfoModal = (type) => {
    setInfoModalType(type);
    setShowInfoModal(true);
  };

  const InfoModal = () => {
    if (!showInfoModal) return null;

    const modalContent = {
      income: {
        title: 'Ingreso Mensual',
        definition: 'El ingreso bruto mensual es el total de dinero que gana antes de impuestos y deducciones. Los prestamistas usan esto para calcular cuánto puede pagar mensualmente.',
        calculation: 'Calculamos esto basándonos en los patrones de transacciones y pagos que aparecen en su estado de cuenta.',
        tips: [
          'Incluye salario base, comisiones, bonos regulares',
          'Si es trabajador independiente, promedio de últimos 2 años',
          'No incluya ingresos no garantizados o temporales'
        ]
      },
      discretionary: {
        title: 'Gasto Discrecional',
        definition: 'Son gastos no esenciales - dinero gastado en compras, entretenimiento, restaurantes, y otros artículos que no son necesidades básicas.',
        calculation: discretionaryBreakdownMonthly.length > 0
          ? `Sumamos todas las categorías no esenciales (promedio mensual basado en ${periodMonths} meses): ${discretionaryBreakdownMonthly.map(([category, amount]) => `${category} (${amount.toFixed(2)})`).join(' + ')} = ${discretionarySpendingMonthly.toFixed(2)}`
          : 'No se detectaron gastos discrecionales en este periodo.',
        tips: [
          'Reduce compras impulsivas para aumentar ahorro',
          'Meta ideal: menos del 20% del ingreso mensual',
          'Cada $100 ahorrado es $100 más para el enganche'
        ]
      },
      dti: {
        title: 'Ratio DTI (Debt-to-Income)',
        definition: 'El ratio de deuda a ingreso compara sus pagos mensuales de deuda contra su ingreso bruto mensual. Es uno de los factores más importantes para calificar para una hipoteca.',
        calculation: `DTI = (Pago Hipotecario + Deudas Actuales) / Ingreso Mensual × 100
        
Desglose:
• Pago Hipotecario Estimado: ${monthlyMortgage.toFixed(2)}
• Pagos de Deuda Actuales: ${estimatedMonthlyDebt.toFixed(2)}
• Total Deuda Mensual: ${totalMonthlyDebt.toFixed(2)}
• Ingreso Mensual: ${monthlyIncome.toFixed(2)}
• DTI Ratio: ${dtiRatio.toFixed(1)}%`,
        tips: [
          'Meta para préstamos convencionales: Menos del 43%',
          'Meta ideal: Menos del 36%',
          'FHA permite hasta 50% en algunos casos',
          'Incluye hipoteca, tarjetas de crédito, préstamos de auto, préstamos estudiantiles'
        ]
      }
    };

    const content = modalContent[infoModalType];
    if (!content) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-600" />
              {content.title}
            </h2>
            <button 
              onClick={() => setShowInfoModal(false)}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">📖 Definición</h3>
              <p className="text-gray-700 leading-relaxed">{content.definition}</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">🧮 Cómo lo Calculamos</h3>
              <p className="text-gray-700 whitespace-pre-line font-mono text-sm">{content.calculation}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 Consejos</h3>
              <ul className="space-y-2">
                {content.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {infoModalType === 'income' && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">✏️ Ajustar Ingreso Mensual</h3>
                <p className="text-gray-700 mb-3">Si el ingreso calculado no es preciso, ajústalo aquí:</p>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="px-4 py-2 border-2 border-blue-300 rounded-lg text-xl font-bold text-blue-600 w-48"
                  />
                  <span className="text-gray-600">por mes</span>
                </div>
              </div>
            )}

            {infoModalType === 'discretionary' && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">📊 Desglose por Categoría</h3>
                <div className="space-y-2">
                  {discretionaryBreakdownMonthly.map(([category, amount]) => (
                    <div key={category} className="flex justify-between">
                      <span className="text-gray-700">{category}:</span>
                      <span className="font-semibold text-gray-900">${amount.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-700 font-bold">
                      Total Discrecional {periodMonths > 1 ? '(Promedio mensual)' : ''}:
                    </span>
                    <span className="font-bold text-blue-600">${discretionarySpendingMonthly.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Porcentaje del ingreso:</span>
                    <span>{monthlyIncome > 0 ? ((discretionarySpendingMonthly / monthlyIncome) * 100).toFixed(1) : 0}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6">
            <button
              onClick={() => setShowInfoModal(false)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const strengths = getStrengths();
  const redFlags = getRedFlags();
  const improvements = getImprovements();

  const chartData = Object.entries(categoryTotalsForDisplay)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {/* Info Modal */}
      <InfoModal />
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex flex-col items-center">
              {/* Animated Spinner */}
              <div className="relative w-20 h-20 mb-4">
                <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              
              {/* Loading Message */}
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                {loadingMessage}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                Por favor espera, esto puede tomar unos segundos...
              </p>
              
              {/* Progress Dots */}
              <div className="flex gap-2 mt-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import/Export Buttons */}
      <div className="flex flex-wrap items-center gap-3 mb-6 no-print">
        <label className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white shadow-sm transition hover:bg-blue-700">
          <Upload className="w-5 h-5" />
          <span className="text-sm font-semibold sm:text-base">Importar Estado de Cuenta (PDF/Imagen/CSV)</span>
          <input 
            type="file" 
            accept=".csv,.pdf,image/*,application/pdf,text/csv" 
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        <button 
          onClick={exportReport}
          type="button"
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white shadow-sm transition hover:bg-emerald-700"
        >
          <Download className="w-5 h-5" />
          <span className="text-sm font-semibold sm:text-base">Exportar Reporte</span>
        </button>
      </div>

      <div className="mb-6 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm no-print">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-slate-700">Periodo del reporte</span>
          <div className="flex rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setReportMonths(1)}
              className={`rounded-md px-3 py-1 text-sm font-semibold transition ${periodMonths === 1 ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Mensual
            </button>
            <button
              type="button"
              onClick={() => setReportMonths(12)}
              className={`rounded-md px-3 py-1 text-sm font-semibold transition ${periodMonths === 12 ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Anual
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              value={reportMonths}
              onChange={(e) => setReportMonths(Math.max(1, Math.min(60, Math.round(Number(e.target.value) || 1))))}
              className="w-20 rounded-md border border-slate-200 px-2 py-1 text-sm font-semibold text-slate-700"
            />
            <span className="text-xs text-slate-500">meses</span>
          </div>
          <span className="text-xs text-slate-500">Las métricas se calculan como promedio mensual.</span>
        </div>
      </div>

      <div id="report-content">
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-xl sm:p-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Evaluación de Preparación del Comprador
            </h1>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Home className="h-6 w-6" />
            </div>
          </div>
          
          <div className="mb-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100 p-5 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <p className="text-gray-600 mb-2">Puntuación General de Preparación</p>
                <p className={`text-5xl font-bold ${readinessColor}`}>{score}/100</p>
                <p className={`text-xl font-semibold mt-2 ${readinessColor}`}>{readinessLevel}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-gray-600">Precio de Casa Objetivo</p>
                <input 
                  type="number" 
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  className="text-2xl font-bold text-blue-600 border-b-2 border-blue-300 bg-transparent text-left sm:text-right w-full sm:w-40"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                  <p className="font-semibold text-gray-700">Ingreso Mensual</p>
                </div>
                <button 
                  onClick={() => openInfoModal('income')}
                  className="text-blue-600 hover:text-blue-800 transition"
                  title="Ver información"
                >
                  <Info className="w-5 h-5" />
                </button>
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
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <ShoppingCart className="w-5 h-5 text-purple-600 mr-2" />
                  <p className="font-semibold text-gray-700">Gasto Discrecional</p>
                </div>
                <button 
                  onClick={() => openInfoModal('discretionary')}
                  className="text-purple-600 hover:text-purple-800 transition"
                  title="Ver información"
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>
              <p className="text-2xl font-bold text-purple-600">${discretionarySpendingMonthly.toFixed(0)}</p>
              <p className="text-xs text-gray-500 mt-1">{periodLabel}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                  <p className="font-semibold text-gray-700">Ratio DTI Estimado</p>
                </div>
                <button 
                  onClick={() => openInfoModal('dti')}
                  className="text-green-600 hover:text-green-800 transition"
                  title="Ver información"
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>
              <p className="text-2xl font-bold text-green-600">{dtiRatio.toFixed(1)}%</p>
              <p className="text-xs text-gray-500 mt-1">Meta: menos de 43%</p>
            </div>
          </div>

          {/* Chart */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-4">
              Top 6 Categorías de Gasto {periodMonths > 1 ? '(Promedio mensual)' : ''}
            </h3>
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
                      style={{width: `${totalSpendingForDisplay > 0 ? (amount / totalSpendingForDisplay) * 100 : 0}%`}}
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
              {strengths.map((strength, idx) => (
                <div key={idx} className="flex items-start bg-green-50 p-3 rounded">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{strength.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <XCircle className="w-6 h-6 text-red-600 mr-2" />
              Señales de Alerta
            </h2>
            <div className="space-y-2">
              {redFlags.map((flag, idx) => (
                <div key={idx} className="flex items-start bg-red-50 p-3 rounded">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{flag.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-3">📋 Lo Que Necesitan Mejorar</h2>
            <ol className="space-y-3 list-decimal list-inside">
              {improvements.map((improvement, idx) => (
                <li key={idx} className="text-gray-700">
                  {improvement}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-2">⏱️ Cronograma Realista</h3>
            <p className="text-gray-700">
              <strong>Si empieza hoy:</strong> {(() => {
                const currentSavingsCapacity = monthlyIncome - totalSpendingMonthly;
                const neededForDownPayment = downPayment + 10000;
                if (currentSavingsCapacity > 100) {
                  const months = Math.ceil(neededForDownPayment / currentSavingsCapacity);
                  return `Con capacidad de ahorro de ${currentSavingsCapacity.toFixed(0)}/mes, su cliente podría estar listo para comprar en ${months}-${months + 6} meses.`;
                } else {
                  return `Necesita reducir gastos o aumentar ingresos para poder ahorrar. Actualmente gasta ${totalSpendingMonthly.toFixed(0)} de ${monthlyIncome.toFixed(0)} de ingreso mensual.`;
                }
              })()}
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
                      ${totalTransactionsAmount.toFixed(2)}
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
                      <th className="border border-gray-300 px-4 py-2 text-right">
                        {periodMonths > 1 ? 'Promedio mensual' : 'Total'}
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-right">
                        % del {periodMonths > 1 ? 'Promedio' : 'Total'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(categoryTotalsForDisplay)
                      .sort((a, b) => b[1] - a[1])
                      .map(([category, amount]) => (
                        <tr key={category} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2 font-semibold">{category}</td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            ${amount.toFixed(2)}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            {totalSpendingForDisplay > 0 ? ((amount / totalSpendingForDisplay) * 100).toFixed(1) : '0.0'}%
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
  </div>
  );
};

export default BuyerReadinessReport;
