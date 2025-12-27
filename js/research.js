
document.addEventListener('DOMContentLoaded',()=>{m();s2();surveyInit();compInit();chartsInit();templatesInit();});

function qs(s,r=document){return r.querySelector(s)}
function qsa(s,r=document){return Array.from(r.querySelectorAll(s))}
function openModal(el){if(!el)return;el.classList.add('active');el.setAttribute('aria-hidden','false')}
function closeModal(el){if(!el)return;el.classList.remove('active');el.setAttribute('aria-hidden','true')}
function csvDownload(name,rows){const csv=rows.map(r=>r.map(c=>`"${String(c??'').replace(/"/g,'""')}"`).join(',')).join('\n');const b=new Blob([csv],{type:'text/csv;charset=utf-8;'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(u)}
function pdfDoc(){return (window.jspdf&&window.jspdf.jsPDF)?new window.jspdf.jsPDF({unit:'pt',format:'a4'}):null}

function m(){const b=qs('.mobile-menu-btn'),n=qs('.nav-links');if(!b||!n)return;b.addEventListener('click',()=>{n.classList.toggle('active');b.classList.toggle('active');document.body.classList.toggle('menu-open')});qsa('.nav-links a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('active');b.classList.remove('active');document.body.classList.remove('menu-open')}))}
function s2(){if(!(window.jQuery&&window.jQuery.fn&&window.jQuery.fn.select2))return;const $=window.jQuery;$('#timeRangeSelect').select2({theme:'bootstrap-5',width:'style',minimumResultsForSearch:Infinity});$('#groupingSelect').select2({theme:'bootstrap-5',width:'style',minimumResultsForSearch:Infinity});$('#questionType').select2({theme:'bootstrap-5',width:'style',minimumResultsForSearch:Infinity,dropdownParent:$('#questionModal .modal-content')})}

function surveyInit(){
  const els={
    title:qs('#surveyTitle'),desc:qs('#surveyDescription'),list:qs('#questionsList'),palette:qs('#questionPalette'),
    addBtn:qs('#addQuestionBtn'),prevBtn:qs('#previewSurveyBtn'),saveBtn:qs('#saveSurveyBtn'),csvBtn:qs('#exportSurveyCsvBtn'),pdfBtn:qs('#exportSurveyPdfBtn'),
    qModal:qs('#questionModal'),qClose:qs('#closeQuestionModal'),qCancel:qs('#cancelQuestionBtn'),qSave:qs('#saveQuestionBtn'),
    qId:qs('#questionId'),qType:qs('#questionType'),qReq:qs('#questionRequired'),qText:qs('#questionText'),
    optWrap:qs('#optionsEditor'),optList:qs('#optionsList'),optAdd:qs('#addOptionBtn'),
    scaleWrap:qs('#scaleEditor'),sMin:qs('#scaleMin'),sMax:qs('#scaleMax'),sMinL:qs('#scaleMinLabel'),sMaxL:qs('#scaleMaxLabel'),
    pModal:qs('#previewModal'),pClose:qs('#closePreviewModal'),pClose2:qs('#closePreviewBtn'),pCont:qs('#previewContainer')
  };
  const KEY='udsm_research_survey_v1';
  const typeLabels={multiple_choice:'Multiple Choice',checkboxes:'Checkboxes',dropdown:'Dropdown',short_answer:'Short Answer',paragraph:'Paragraph',linear_scale:'Linear Scale',date:'Date',time:'Time'};
  const withOptions=new Set(['multiple_choice','checkboxes','dropdown']);
  let survey={title:'',description:'',questions:[]};

  const load=()=>{try{const s=JSON.parse(localStorage.getItem(KEY)||'');if(!s)return;survey.title=String(s.title||'');survey.description=String(s.description||'');survey.questions=Array.isArray(s.questions)?s.questions:[];els.title.value=survey.title;els.desc.value=survey.description;}catch{}};
  const save=()=>{survey.title=(els.title.value||'').trim();survey.description=(els.desc.value||'').trim();localStorage.setItem(KEY,JSON.stringify(survey))};
  const uid=()=>`q_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;

  function setEditors(){const t=els.qType.value;els.optWrap.style.display=withOptions.has(t)?'block':'none';els.scaleWrap.style.display=t==='linear_scale'?'block':'none'}
  function renderOptions(opts){els.optList.innerHTML='';opts.forEach((v,i)=>{const row=document.createElement('div');row.style.display='flex';row.style.gap='0.5rem';row.style.marginBottom='0.6rem';const input=document.createElement('input');input.className='input';input.dataset.optionId=String(i);input.value=v;const del=document.createElement('button');del.className='btn btn-danger';del.type='button';del.style.padding='0.65rem 0.9rem';del.innerHTML='<i class="fas fa-trash"></i>';del.addEventListener('click',()=>{const cur=qsa('input[data-option-id]',els.optList).map(x=>(x.value||'').trim());cur.splice(i,1);renderOptions(cur.length?cur:['Option 1'])});row.append(input,del);els.optList.appendChild(row)})}

  function resetModal(type='multiple_choice'){els.qId.value='';els.qType.value=type;els.qReq.checked=false;els.qText.value='';renderOptions(['Option 1','Option 2']);els.sMin.value='1';els.sMax.value='5';els.sMinL.value='';els.sMaxL.value='';setEditors();if(window.jQuery&&window.jQuery.fn&&window.jQuery.fn.select2)window.jQuery(els.qType).trigger('change.select2')}
  function fillModal(q){els.qId.value=q.id;els.qType.value=q.type;els.qReq.checked=!!q.required;els.qText.value=q.text||'';if(withOptions.has(q.type))renderOptions((q.options&&q.options.length)?q.options:['Option 1']);else renderOptions(['Option 1']);if(q.type==='linear_scale'){const s=q.scale||{min:1,max:5,minLabel:'',maxLabel:''};els.sMin.value=String(s.min??1);els.sMax.value=String(s.max??5);els.sMinL.value=s.minLabel??'';els.sMaxL.value=s.maxLabel??'';}setEditors();if(window.jQuery&&window.jQuery.fn&&window.jQuery.fn.select2)window.jQuery(els.qType).trigger('change.select2')}

  function draftFromModal(){const t=els.qType.value;const d={id:els.qId.value||uid(),type:t,text:(els.qText.value||'').trim(),required:!!els.qReq.checked,options:[],scale:null};
    if(withOptions.has(t)){
      const opts=qsa('input[data-option-id]',els.optList).map(x=>(x.value||'').trim()).filter(Boolean);
      d.options=opts.length?opts:['Option 1'];
    }
    if(t==='linear_scale'){
      const min=Number(els.sMin.value),max=Number(els.sMax.value);
      d.scale={min:Number.isFinite(min)?min:1,max:Number.isFinite(max)?max:5,minLabel:(els.sMinL.value||'').trim(),maxLabel:(els.sMaxL.value||'').trim()};
    }
    return d;
  }

  function renderList(){els.list.innerHTML='';if(!survey.questions.length){const e=document.createElement('div');e.className='inline-note';e.textContent='No questions yet. Click “Add Question” or choose a type on the right.';els.list.appendChild(e);return;}
    survey.questions.forEach((q,i)=>{const card=document.createElement('div');card.className='question-card';
      const head=document.createElement('div');head.className='question-head';
      const left=document.createElement('div');
      const title=document.createElement('p');title.className='question-title';title.textContent=`${i+1}. ${q.text||'(Untitled question)'}`;
      const meta=document.createElement('div');meta.className='question-meta';
      const b1=document.createElement('span');b1.className='badge';b1.textContent=typeLabels[q.type]||q.type;meta.appendChild(b1);
      if(q.required){const b2=document.createElement('span');b2.className='badge required';b2.textContent='Required';meta.appendChild(b2)}
      left.append(title,meta);
      const acts=document.createElement('div');acts.className='question-actions';
      const edit=document.createElement('button');edit.className='icon-btn';edit.type='button';edit.innerHTML='<i class="fas fa-pen"></i>';edit.addEventListener('click',()=>{fillModal(q);openModal(els.qModal)});
      const del=document.createElement('button');del.className='icon-btn';del.type='button';del.innerHTML='<i class="fas fa-trash"></i>';del.addEventListener('click',()=>{survey.questions=survey.questions.filter(x=>x.id!==q.id);save();renderList()});
      acts.append(edit,del);head.append(left,acts);card.appendChild(head);els.list.appendChild(card);
    });
  }

  function renderPreview(){els.pCont.innerHTML='';const wrap=document.createElement('div');wrap.className='card';
    const h=document.createElement('h3');h.textContent=(survey.title||'Survey Preview').trim();wrap.appendChild(h);
    if(survey.description){const p=document.createElement('p');p.style.color='var(--medium-gray)';p.textContent=survey.description;wrap.appendChild(p)}
    const form=document.createElement('form');
    survey.questions.forEach((q,i)=>{const g=document.createElement('div');g.className='form-group';
      const lab=document.createElement('label');lab.textContent=`${i+1}. ${q.text||''}${q.required?' *':''}`;g.appendChild(lab);
      if(q.type==='short_answer'){const inp=document.createElement('input');inp.className='input';inp.type='text';inp.required=!!q.required;g.appendChild(inp)}
      else if(q.type==='paragraph'){const ta=document.createElement('textarea');ta.className='textarea';ta.required=!!q.required;g.appendChild(ta)}
      else if(q.type==='date'){const inp=document.createElement('input');inp.className='input';inp.type='date';inp.required=!!q.required;g.appendChild(inp)}
      else if(q.type==='time'){const inp=document.createElement('input');inp.className='input';inp.type='time';inp.required=!!q.required;g.appendChild(inp)}
      else if(q.type==='linear_scale'){
        const min=q.scale?.min??1,max=q.scale?.max??5;const r=document.createElement('input');r.className='input';r.type='range';r.min=String(min);r.max=String(max);r.value=String(min);g.appendChild(r);
        const note=document.createElement('div');note.className='inline-note';note.textContent=`${q.scale?.minLabel?q.scale.minLabel+' • ':''}${min} - ${max}${q.scale?.maxLabel?' • '+q.scale.maxLabel:''}`;g.appendChild(note);
      } else if(q.type==='dropdown'){
        const sel=document.createElement('select');sel.className='select';sel.required=!!q.required;(q.options||[]).forEach(o=>{const op=document.createElement('option');op.value=o;op.textContent=o;sel.appendChild(op)});g.appendChild(sel)
      } else if(q.type==='multiple_choice'||q.type==='checkboxes'){
        (q.options||[]).forEach((o,idx)=>{const row=document.createElement('label');row.style.display='flex';row.style.gap='0.5rem';row.style.alignItems='center';row.style.marginBottom='0.35rem';
          const inp=document.createElement('input');inp.type=q.type==='checkboxes'?'checkbox':'radio';inp.name=q.id;inp.value=o;if(q.required&&q.type==='multiple_choice'&&idx===0)inp.required=true;row.append(inp,document.createTextNode(o));g.appendChild(row)
        })
      } else {
        const inp=document.createElement('input');inp.className='input';inp.type='text';inp.required=!!q.required;g.appendChild(inp)
      }
      form.appendChild(g);
    });
    wrap.appendChild(form);els.pCont.appendChild(wrap);
  }

  function exportCsv(){const rows=[[ 'Question','Type','Required','Options','ScaleMin','ScaleMax','ScaleMinLabel','ScaleMaxLabel' ]];
    survey.questions.forEach(q=>rows.push([q.text||'',typeLabels[q.type]||q.type,q.required?'Yes':'No',Array.isArray(q.options)?q.options.join(' | '):'',q.scale?.min??'',q.scale?.max??'',q.scale?.minLabel??'',q.scale?.maxLabel??'']));
    csvDownload('survey.csv',rows)
  }

  function exportPdf(){const doc=pdfDoc();if(!doc){alert('PDF export library not loaded.');return;}
    const t=(survey.title||'Survey').trim();const d=(survey.description||'').trim();
    doc.setFontSize(18);doc.text(t,40,50);if(d){doc.setFontSize(11);doc.text(doc.splitTextToSize(d,515),40,72)}
    const y=d?105:85;
    const head=[['#','Question','Type','Required']];
    const body=survey.questions.map((q,i)=>[String(i+1),q.text||'',typeLabels[q.type]||q.type,q.required?'Yes':'No']);
    if(typeof doc.autoTable==='function')doc.autoTable({head,body,startY:y,styles:{fontSize:9,cellPadding:6},headStyles:{fillColor:[37,99,235]},columnStyles:{0:{cellWidth:28},3:{cellWidth:62}}});
    doc.save('survey.pdf')
  }

  function wire(){
    els.title.addEventListener('input',save);els.desc.addEventListener('input',save);
    els.palette.addEventListener('click',e=>{const b=e.target.closest('button[data-type]');if(!b)return;resetModal(b.dataset.type);openModal(els.qModal)});
    els.addBtn.addEventListener('click',()=>{resetModal('multiple_choice');openModal(els.qModal)});
    els.qType.addEventListener('change',()=>{setEditors();if(withOptions.has(els.qType.value)){
      const cur=qsa('input[data-option-id]',els.optList).map(x=>(x.value||'').trim()).filter(Boolean);renderOptions(cur.length?cur:['Option 1','Option 2']);
    }});
    els.optAdd.addEventListener('click',()=>{const cur=qsa('input[data-option-id]',els.optList).map(x=>(x.value||'').trim());cur.push(`Option ${cur.length+1}`);renderOptions(cur)});

    const closeQ=()=>closeModal(els.qModal);
    els.qClose.addEventListener('click',closeQ);els.qCancel.addEventListener('click',closeQ);
    els.qModal.addEventListener('click',e=>{if(e.target===els.qModal)closeQ()});

    els.qSave.addEventListener('click',()=>{const d=draftFromModal();if(!d.text){alert('Please enter the question text.');return;}
      const idx=survey.questions.findIndex(q=>q.id===d.id);if(idx>=0)survey.questions[idx]=d;else survey.questions.push(d);
      save();renderList();closeQ();
    });

    els.prevBtn.addEventListener('click',()=>{save();renderPreview();openModal(els.pModal)});
    const closeP=()=>closeModal(els.pModal);
    els.pClose.addEventListener('click',closeP);els.pClose2.addEventListener('click',closeP);
    els.pModal.addEventListener('click',e=>{if(e.target===els.pModal)closeP()});

    els.saveBtn.addEventListener('click',()=>{save();alert('Survey saved in this browser.');});
    els.csvBtn.addEventListener('click',()=>{save();exportCsv()});
    els.pdfBtn.addEventListener('click',()=>{save();exportPdf()});
  }

  load();
  renderList();
  wire();

  window.__researchSurveyAPI={
    setSurvey(newSurvey){survey=newSurvey;els.title.value=survey.title||'';els.desc.value=survey.description||'';save();renderList();},
    getSurvey(){save();return survey;}
  };
}

function compInit(){
  const els={
    table:qs('#competitorTable'),addBtn:qs('#addCompetitorBtn'),csvBtn:qs('#exportCompetitorCsvBtn'),pdfBtn:qs('#exportCompetitorPdfBtn'),
    sS:qs('#swotStrengths'),sW:qs('#swotWeaknesses'),sO:qs('#swotOpportunities'),sT:qs('#swotThreats')
  };
  const KEY='udsm_research_comp_v1';
  const metrics=[
    'Market Share (%)','Pricing (USD)','Product Features (1-10)','Customer Satisfaction (1-10)','Social Media Presence (1-10)'
  ];
  let model={competitors:['Your Startup'],values:{},swot:{strengths:'',weaknesses:'',opportunities:'',threats:''}};

  const load=()=>{try{const s=JSON.parse(localStorage.getItem(KEY)||'');if(!s)return;model.competitors=Array.isArray(s.competitors)&&s.competitors.length?s.competitors:['Your Startup'];model.values=s.values||{};model.swot=s.swot||model.swot;els.sS.value=model.swot.strengths||'';els.sW.value=model.swot.weaknesses||'';els.sO.value=model.swot.opportunities||'';els.sT.value=model.swot.threats||'';}catch{}};
  const save=()=>{model.swot={strengths:els.sS.value||'',weaknesses:els.sW.value||'',opportunities:els.sO.value||'',threats:els.sT.value||''};localStorage.setItem(KEY,JSON.stringify(model))};
  const cellKey=(metric,comp)=>`${metric}__${comp}`;

  function render(){
    if(!els.table)return;
    const t=els.table;
    t.innerHTML='';
    const thead=document.createElement('thead');
    const hr=document.createElement('tr');
    const h0=document.createElement('th');h0.textContent='Category';hr.appendChild(h0);
    model.competitors.forEach((c,idx)=>{const th=document.createElement('th');
      const wrap=document.createElement('div');wrap.style.display='flex';wrap.style.gap='0.5rem';wrap.style.alignItems='center';
      const input=document.createElement('input');input.className='cell-input';input.value=c;input.title='Competitor name';
      input.addEventListener('input',()=>{
        const old=model.competitors[idx];
        const nu=input.value.trim()||`Competitor ${idx+1}`;
        model.competitors[idx]=nu;
        // remap stored values
        metrics.forEach(m=>{const ok=cellKey(m,old),nk=cellKey(m,nu);if(model.values[ok]!=null){model.values[nk]=model.values[ok];delete model.values[ok];}});
        save();
      });
      wrap.appendChild(input);
      if(idx>0){
        const del=document.createElement('button');del.className='icon-btn';del.type='button';del.innerHTML='<i class="fas fa-trash"></i>';
        del.addEventListener('click',()=>{const name=model.competitors[idx];model.competitors.splice(idx,1);metrics.forEach(m=>delete model.values[cellKey(m,name)]);save();render();});
        wrap.appendChild(del);
      }
      th.appendChild(wrap);
      hr.appendChild(th);
    });
    thead.appendChild(hr);
    t.appendChild(thead);

    const tbody=document.createElement('tbody');
    metrics.forEach(m=>{
      const tr=document.createElement('tr');
      const td0=document.createElement('td');td0.textContent=m;tr.appendChild(td0);
      model.competitors.forEach(c=>{
        const td=document.createElement('td');
        const input=document.createElement('input');input.className='cell-input';input.value=String(model.values[cellKey(m,c)]??'');
        input.addEventListener('input',()=>{model.values[cellKey(m,c)]=input.value;save();});
        td.appendChild(input);tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    t.appendChild(tbody);
  }

  function exportCsv(){
    const rows=[['Category',...model.competitors]];
    metrics.forEach(m=>{rows.push([m,...model.competitors.map(c=>String(model.values[cellKey(m,c)]??''))])});
    rows.push([]);
    rows.push(['SWOT']);
    rows.push(['Strengths',model.swot.strengths||'']);
    rows.push(['Weaknesses',model.swot.weaknesses||'']);
    rows.push(['Opportunities',model.swot.opportunities||'']);
    rows.push(['Threats',model.swot.threats||'']);
    csvDownload('competitor-analysis.csv',rows);
  }

  function exportPdf(){
    const doc=pdfDoc();if(!doc){alert('PDF export library not loaded.');return;}
    doc.setFontSize(16);doc.text('Competitor Analysis',40,50);
    const head=[['Category',...model.competitors]];
    const body=metrics.map(m=>[m,...model.competitors.map(c=>String(model.values[cellKey(m,c)]??''))]);
    if(typeof doc.autoTable==='function'){
      doc.autoTable({head,body,startY:70,styles:{fontSize:8,cellPadding:5},headStyles:{fillColor:[37,99,235]}});
      const y=doc.lastAutoTable?doc.lastAutoTable.finalY+20:420;
      doc.setFontSize(12);doc.text('SWOT',40,y);
      doc.setFontSize(10);
      const sw=[['Strengths',model.swot.strengths||''],['Weaknesses',model.swot.weaknesses||''],['Opportunities',model.swot.opportunities||''],['Threats',model.swot.threats||'']];
      doc.autoTable({head:[['Area','Notes']],body:sw,startY:y+10,styles:{fontSize:9,cellPadding:6},headStyles:{fillColor:[31,41,55]}});
    }
    doc.save('competitor-analysis.pdf');
  }

  function wire(){
    const swSave=()=>save();
    [els.sS,els.sW,els.sO,els.sT].forEach(t=>t&&t.addEventListener('input',swSave));
    els.addBtn&&els.addBtn.addEventListener('click',()=>{model.competitors.push(`Competitor ${model.competitors.length}`);save();render();});
    els.csvBtn&&els.csvBtn.addEventListener('click',()=>{save();exportCsv();});
    els.pdfBtn&&els.pdfBtn.addEventListener('click',()=>{save();exportPdf();});
  }

  load();
  render();
  wire();

  window.__researchCompetitorAPI={
    setCompetitors(list){model.competitors=list&&list.length?list:['Your Startup'];save();render();},
    getCompetitors(){save();return model;}
  };
}

function chartsInit(){
  if(!window.Chart)return;
  const tabs=qs('#chartTabs');
  const timeSel=qs('#timeRangeSelect');
  const grpSel=qs('#groupingSelect');
  const exportBtn=qs('#exportChartBtn');

  const panels=qsa('[data-chart-panel]');
  const setPanel=(key)=>{panels.forEach(p=>p.style.display=(p.dataset.chartPanel===key)?'block':'none')};

  const colors={blue:'#2563eb',green:'#10b981',orange:'#f59e0b',gray:'#1f2937'};
  const ctx={
    marketShare:qs('#marketShareChart')?.getContext('2d'),
    priceComparison:qs('#priceComparisonChart')?.getContext('2d'),
    customerSatisfaction:qs('#customerSatisfactionChart')?.getContext('2d'),
    revenueTrends:qs('#revenueTrendsChart')?.getContext('2d')
  };

  const state={active:'marketShare',charts:{}};

  function makeLabels(range,group){
    const now=new Date();
    let months=12;
    if(range==='6m')months=6;else if(range==='3y')months=36;
    if(group==='quarterly')months=Math.ceil(months/3)*3;
    const labels=[];
    for(let i=months-1;i>=0;i--){
      const d=new Date(now.getFullYear(),now.getMonth()-i,1);
      if(group==='monthly')labels.push(d.toLocaleString('en',{month:'short'})+' '+String(d.getFullYear()).slice(2));
      else if((months-1-i)%3===0){
        const q=Math.floor(d.getMonth()/3)+1;
        labels.push(`Q${q} ${d.getFullYear()}`);
      }
    }
    return labels;
  }

  function randSeries(n,min,max){const a=[];for(let i=0;i<n;i++){a.push(Math.round((min+Math.random()*(max-min))*10)/10)}return a}

  function rebuild(){
    const range=timeSel?.value||'1y';
    const group=grpSel?.value||'monthly';
    const labels=makeLabels(range,group);

    // Market share (pie) not dependent on range
    if(state.charts.marketShare){state.charts.marketShare.destroy();}
    if(ctx.marketShare){
      state.charts.marketShare=new Chart(ctx.marketShare,{type:'doughnut',data:{labels:['Your Startup','Competitor A','Competitor B','Competitor C'],datasets:[{data:[28,24,18,30],backgroundColor:[colors.blue,colors.green,colors.orange,colors.gray]}]},options:{responsive:true,plugins:{legend:{position:'bottom'}}}});
    }

    // Price comparison (bar)
    if(state.charts.priceComparison){state.charts.priceComparison.destroy();}
    if(ctx.priceComparison){
      state.charts.priceComparison=new Chart(ctx.priceComparison,{type:'bar',data:{labels:['Your Startup','Competitor A','Competitor B','Competitor C'],datasets:[{label:'Average Price (USD)',data:[12,10,14,9],backgroundColor:colors.blue}]} ,options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}});
    }

    // Customer satisfaction (radar)
    if(state.charts.customerSatisfaction){state.charts.customerSatisfaction.destroy();}
    if(ctx.customerSatisfaction){
      state.charts.customerSatisfaction=new Chart(ctx.customerSatisfaction,{type:'radar',data:{labels:['Support','Value','Quality','Ease','Availability'],datasets:[{label:'Your Startup',data:[8,7,8.5,7.5,7],borderColor:colors.blue,backgroundColor:'rgba(37,99,235,0.18)'},{label:'Competitor A',data:[7,7.2,7.8,7,6.5],borderColor:colors.green,backgroundColor:'rgba(16,185,129,0.15)'}]},options:{responsive:true,plugins:{legend:{position:'bottom'}},scales:{r:{suggestedMin:0,suggestedMax:10}}}});
    }

    // Revenue trends (line) depends on labels
    if(state.charts.revenueTrends){state.charts.revenueTrends.destroy();}
    if(ctx.revenueTrends){
      state.charts.revenueTrends=new Chart(ctx.revenueTrends,{type:'line',data:{labels,datasets:[{label:'Revenue (k USD)',data:randSeries(labels.length,8,22),borderColor:colors.blue,backgroundColor:'rgba(37,99,235,0.12)',tension:0.35,fill:true}]},options:{responsive:true,plugins:{legend:{position:'bottom'}},scales:{y:{beginAtZero:true}}}});
    }
  }

  function setActive(key){state.active=key;setPanel(key);qsa('.tab-btn',tabs).forEach(b=>b.classList.toggle('active',b.dataset.chart===key));}

  function exportActive(){
    const map={marketShare:'marketShareChart',priceComparison:'priceComparisonChart',customerSatisfaction:'customerSatisfactionChart',revenueTrends:'revenueTrendsChart'};
    const id=map[state.active];
    const canvas=qs('#'+id);
    if(canvas&&canvas.toDataURL){
      const url=canvas.toDataURL('image/png');
      const a=document.createElement('a');a.href=url;a.download=`${state.active}.png`;document.body.appendChild(a);a.click();a.remove();
      return;
    }
    const panel=qs(`[data-chart-panel="${state.active}"]`);
    if(window.html2canvas&&panel){
      window.html2canvas(panel).then(c=>{const a=document.createElement('a');a.href=c.toDataURL('image/png');a.download=`${state.active}.png`;document.body.appendChild(a);a.click();a.remove();});
    }
  }

  if(tabs){tabs.addEventListener('click',e=>{const b=e.target.closest('.tab-btn');if(!b)return;setActive(b.dataset.chart);});}
  timeSel&&timeSel.addEventListener('change',rebuild);
  grpSel&&grpSel.addEventListener('change',rebuild);
  exportBtn&&exportBtn.addEventListener('click',exportActive);

  setActive('marketShare');
  rebuild();
}

function templatesInit(){
  const btns=qsa('[data-template]');
  if(!btns.length)return;

  const templates={
    customerDiscovery:{title:'Customer Discovery Survey',description:'Understand pain points and validate the problem.',questions:[
      {type:'short_answer',text:'What best describes you (role/industry)?',required:true},
      {type:'paragraph',text:'What is the biggest challenge you face related to this problem?',required:true},
      {type:'multiple_choice',text:'How do you currently solve this problem?',required:true,options:['Manual process','Using an app','Outsourcing','Not solving it']},
      {type:'linear_scale',text:'How urgent is it to solve this problem?',required:true,scale:{min:1,max:5,minLabel:'Not urgent',maxLabel:'Very urgent'}},
      {type:'date',text:'When did you last experience this problem?',required:false}
    ]},
    marketSizing:{title:'Market Sizing Research',description:'Estimate demand and segmentation assumptions.',questions:[
      {type:'dropdown',text:'Primary customer segment',required:true,options:['Students','SMEs','Enterprises','Government','Other']},
      {type:'multiple_choice',text:'Preferred buying channel',required:true,options:['Online','In-person','Agent/Reseller','Partner']},
      {type:'short_answer',text:'Approximate monthly spend on this category (TZS)',required:false},
      {type:'linear_scale',text:'Likelihood to switch from current option',required:true,scale:{min:1,max:5,minLabel:'Very unlikely',maxLabel:'Very likely'}},
      {type:'paragraph',text:'What would convince you to switch?',required:false}
    ]},
    competitorScan:{title:'Competitor Scan Survey',description:'Collect comparative insights and positioning signals.',questions:[
      {type:'multiple_choice',text:'Which alternatives do you know?',required:true,options:['Competitor A','Competitor B','Competitor C','Other']},
      {type:'checkboxes',text:'What matters most when choosing a solution?',required:true,options:['Price','Features','Support','Brand','Ease of use']},
      {type:'linear_scale',text:'How satisfied are you with current solutions?',required:true,scale:{min:1,max:10,minLabel:'Not satisfied',maxLabel:'Very satisfied'}},
      {type:'paragraph',text:'What do you wish current solutions did better?',required:false},
      {type:'time',text:'Best time to contact you for a follow-up',required:false}
    ]},
    productFeedback:{title:'Product Feedback Survey',description:'Gather feedback on a prototype and measure satisfaction.',questions:[
      {type:'checkboxes',text:'Which features did you use?',required:false,options:['Feature A','Feature B','Feature C','Feature D']},
      {type:'linear_scale',text:'Overall satisfaction',required:true,scale:{min:1,max:5,minLabel:'Poor',maxLabel:'Excellent'}},
      {type:'multiple_choice',text:'What would you improve first?',required:true,options:['Performance','UI/UX','More features','Pricing']},
      {type:'paragraph',text:'Any other comments?',required:false},
      {type:'short_answer',text:'Email (optional)',required:false}
    ]}
  };

  const normalizeQuestions=(qs)=>qs.map(q=>({
    id:`q_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`,
    type:q.type,text:q.text,required:!!q.required,options:q.options||[],scale:q.scale||null
  }));

  btns.forEach(b=>b.addEventListener('click',()=>{
    const key=b.dataset.template;const t=templates[key];
    if(!t||!window.__researchSurveyAPI){alert('Survey tool not ready.');return;}
    window.__researchSurveyAPI.setSurvey({title:t.title,description:t.description,questions:normalizeQuestions(t.questions)});
    const target=document.getElementById('survey-builder');
    target&&target.scrollIntoView({behavior:'smooth'});
  }));
}
document.addEventListener('DOMContentLoaded',()=>{m();s2();surveyInit();compInit();chartsInit();templatesInit();});

function qs(s,r=document){return r.querySelector(s)}
function qsa(s,r=document){return Array.from(r.querySelectorAll(s))}
function openModal(el){if(!el)return;el.classList.add('active');el.setAttribute('aria-hidden','false')}
function closeModal(el){if(!el)return;el.classList.remove('active');el.setAttribute('aria-hidden','true')}
function csvDownload(name,rows){const csv=rows.map(r=>r.map(c=>`"${String(c??'').replace(/"/g,'""')}"`).join(',')).join('\n');const b=new Blob([csv],{type:'text/csv;charset=utf-8;'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(u)}
function pdfDoc(){return (window.jspdf&&window.jspdf.jsPDF)?new window.jspdf.jsPDF({unit:'pt',format:'a4'}):null}

function m(){const b=qs('.mobile-menu-btn'),n=qs('.nav-links');if(!b||!n)return;b.addEventListener('click',()=>{n.classList.toggle('active');b.classList.toggle('active');document.body.classList.toggle('menu-open')});qsa('.nav-links a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('active');b.classList.remove('active');document.body.classList.remove('menu-open')}))}
function s2(){if(!(window.jQuery&&window.jQuery.fn&&window.jQuery.fn.select2))return;const $=window.jQuery;$('#timeRangeSelect').select2({theme:'bootstrap-5',width:'style',minimumResultsForSearch:Infinity});$('#groupingSelect').select2({theme:'bootstrap-5',width:'style',minimumResultsForSearch:Infinity});$('#questionType').select2({theme:'bootstrap-5',width:'style',minimumResultsForSearch:Infinity,dropdownParent:$('#questionModal .modal-content')})}

function surveyInit(){
  const els={
    title:qs('#surveyTitle'),desc:qs('#surveyDescription'),list:qs('#questionsList'),palette:qs('#questionPalette'),
    addBtn:qs('#addQuestionBtn'),prevBtn:qs('#previewSurveyBtn'),saveBtn:qs('#saveSurveyBtn'),csvBtn:qs('#exportSurveyCsvBtn'),pdfBtn:qs('#exportSurveyPdfBtn'),
    qModal:qs('#questionModal'),qClose:qs('#closeQuestionModal'),qCancel:qs('#cancelQuestionBtn'),qSave:qs('#saveQuestionBtn'),
    qId:qs('#questionId'),qType:qs('#questionType'),qReq:qs('#questionRequired'),qText:qs('#questionText'),
    optWrap:qs('#optionsEditor'),optList:qs('#optionsList'),optAdd:qs('#addOptionBtn'),
    scaleWrap:qs('#scaleEditor'),sMin:qs('#scaleMin'),sMax:qs('#scaleMax'),sMinL:qs('#scaleMinLabel'),sMaxL:qs('#scaleMaxLabel'),
    pModal:qs('#previewModal'),pClose:qs('#closePreviewModal'),pClose2:qs('#closePreviewBtn'),pCont:qs('#previewContainer')
  };
  const KEY='udsm_research_survey_v1';
  const typeLabels={multiple_choice:'Multiple Choice',checkboxes:'Checkboxes',dropdown:'Dropdown',short_answer:'Short Answer',paragraph:'Paragraph',linear_scale:'Linear Scale',date:'Date',time:'Time'};
  const withOptions=new Set(['multiple_choice','checkboxes','dropdown']);
  let survey={title:'',description:'',questions:[]};

  const load=()=>{try{const s=JSON.parse(localStorage.getItem(KEY)||'');if(!s)return;survey.title=String(s.title||'');survey.description=String(s.description||'');survey.questions=Array.isArray(s.questions)?s.questions:[];els.title.value=survey.title;els.desc.value=survey.description;}catch{}};
  const save=()=>{survey.title=(els.title.value||'').trim();survey.description=(els.desc.value||'').trim();localStorage.setItem(KEY,JSON.stringify(survey))};
  const uid=()=>`q_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;

  function setEditors(){const t=els.qType.value;els.optWrap.style.display=withOptions.has(t)?'block':'none';els.scaleWrap.style.display=t==='linear_scale'?'block':'none'}
  function renderOptions(opts){els.optList.innerHTML='';opts.forEach((v,i)=>{const row=document.createElement('div');row.style.display='flex';row.style.gap='0.5rem';row.style.marginBottom='0.6rem';const input=document.createElement('input');input.className='input';input.dataset.optionId=String(i);input.value=v;const del=document.createElement('button');del.className='btn btn-danger';del.type='button';del.style.padding='0.65rem 0.9rem';del.innerHTML='<i class="fas fa-trash"></i>';del.addEventListener('click',()=>{const cur=qsa('input[data-option-id]',els.optList).map(x=>(x.value||'').trim());cur.splice(i,1);renderOptions(cur.length?cur:['Option 1'])});row.append(input,del);els.optList.appendChild(row)})}

  function resetModal(type='multiple_choice'){els.qId.value='';els.qType.value=type;els.qReq.checked=false;els.qText.value='';renderOptions(['Option 1','Option 2']);els.sMin.value='1';els.sMax.value='5';els.sMinL.value='';els.sMaxL.value='';setEditors();if(window.jQuery&&window.jQuery.fn&&window.jQuery.fn.select2)window.jQuery(els.qType).trigger('change.select2')}
  function fillModal(q){els.qId.value=q.id;els.qType.value=q.type;els.qReq.checked=!!q.required;els.qText.value=q.text||'';if(withOptions.has(q.type))renderOptions((q.options&&q.options.length)?q.options:['Option 1']);else renderOptions(['Option 1']);if(q.type==='linear_scale'){const s=q.scale||{min:1,max:5,minLabel:'',maxLabel:''};els.sMin.value=String(s.min??1);els.sMax.value=String(s.max??5);els.sMinL.value=s.minLabel??'';els.sMaxL.value=s.maxLabel??'';}setEditors();if(window.jQuery&&window.jQuery.fn&&window.jQuery.fn.select2)window.jQuery(els.qType).trigger('change.select2')}

  function draftFromModal(){const t=els.qType.value;const d={id:els.qId.value||uid(),type:t,text:(els.qText.value||'').trim(),required:!!els.qReq.checked,options:[],scale:null};
    if(withOptions.has(t)){
      const opts=qsa('input[data-option-id]',els.optList).map(x=>(x.value||'').trim()).filter(Boolean);
      d.options=opts.length?opts:['Option 1'];
    }
    if(t==='linear_scale'){
      const min=Number(els.sMin.value),max=Number(els.sMax.value);
      d.scale={min:Number.isFinite(min)?min:1,max:Number.isFinite(max)?max:5,minLabel:(els.sMinL.value||'').trim(),maxLabel:(els.sMaxL.value||'').trim()};
    }
    return d;
  }

  function renderList(){els.list.innerHTML='';if(!survey.questions.length){const e=document.createElement('div');e.className='inline-note';e.textContent='No questions yet. Click “Add Question” or choose a type on the right.';els.list.appendChild(e);return;}
    survey.questions.forEach((q,i)=>{const card=document.createElement('div');card.className='question-card';
      const head=document.createElement('div');head.className='question-head';
      const left=document.createElement('div');
      const title=document.createElement('p');title.className='question-title';title.textContent=`${i+1}. ${q.text||'(Untitled question)'}`;
      const meta=document.createElement('div');meta.className='question-meta';
      const b1=document.createElement('span');b1.className='badge';b1.textContent=typeLabels[q.type]||q.type;meta.appendChild(b1);
      if(q.required){const b2=document.createElement('span');b2.className='badge required';b2.textContent='Required';meta.appendChild(b2)}
      left.append(title,meta);
      const acts=document.createElement('div');acts.className='question-actions';
      const edit=document.createElement('button');edit.className='icon-btn';edit.type='button';edit.innerHTML='<i class="fas fa-pen"></i>';edit.addEventListener('click',()=>{fillModal(q);openModal(els.qModal)});
      const del=document.createElement('button');del.className='icon-btn';del.type='button';del.innerHTML='<i class="fas fa-trash"></i>';del.addEventListener('click',()=>{survey.questions=survey.questions.filter(x=>x.id!==q.id);save();renderList()});
      acts.append(edit,del);head.append(left,acts);card.appendChild(head);els.list.appendChild(card);
    });
  }

  function renderPreview(){els.pCont.innerHTML='';const wrap=document.createElement('div');wrap.className='card';
    const h=document.createElement('h3');h.textContent=(survey.title||'Survey Preview').trim();wrap.appendChild(h);
    if(survey.description){const p=document.createElement('p');p.style.color='var(--medium-gray)';p.textContent=survey.description;wrap.appendChild(p)}
    const form=document.createElement('form');
    survey.questions.forEach((q,i)=>{const g=document.createElement('div');g.className='form-group';
      const lab=document.createElement('label');lab.textContent=`${i+1}. ${q.text||''}${q.required?' *':''}`;g.appendChild(lab);
      if(q.type==='short_answer'){const inp=document.createElement('input');inp.className='input';inp.type='text';inp.required=!!q.required;g.appendChild(inp)}
      else if(q.type==='paragraph'){const ta=document.createElement('textarea');ta.className='textarea';ta.required=!!q.required;g.appendChild(ta)}
      else if(q.type==='date'){const inp=document.createElement('input');inp.className='input';inp.type='date';inp.required=!!q.required;g.appendChild(inp)}
      else if(q.type==='time'){const inp=document.createElement('input');inp.className='input';inp.type='time';inp.required=!!q.required;g.appendChild(inp)}
      else if(q.type==='linear_scale'){
        const min=q.scale?.min??1,max=q.scale?.max??5;const r=document.createElement('input');r.className='input';r.type='range';r.min=String(min);r.max=String(max);r.value=String(min);g.appendChild(r);
        const note=document.createElement('div');note.className='inline-note';note.textContent=`${q.scale?.minLabel?q.scale.minLabel+' • ':''}${min} - ${max}${q.scale?.maxLabel?' • '+q.scale.maxLabel:''}`;g.appendChild(note);
      } else if(q.type==='dropdown'){
        const sel=document.createElement('select');sel.className='select';sel.required=!!q.required;(q.options||[]).forEach(o=>{const op=document.createElement('option');op.value=o;op.textContent=o;sel.appendChild(op)});g.appendChild(sel)
      } else if(q.type==='multiple_choice'||q.type==='checkboxes'){
        (q.options||[]).forEach((o,idx)=>{const row=document.createElement('label');row.style.display='flex';row.style.gap='0.5rem';row.style.alignItems='center';row.style.marginBottom='0.35rem';
          const inp=document.createElement('input');inp.type=q.type==='checkboxes'?'checkbox':'radio';inp.name=q.id;inp.value=o;if(q.required&&q.type==='multiple_choice'&&idx===0)inp.required=true;row.append(inp,document.createTextNode(o));g.appendChild(row)
        })
      } else {
        const inp=document.createElement('input');inp.className='input';inp.type='text';inp.required=!!q.required;g.appendChild(inp)
      }
      form.appendChild(g);
    });
    wrap.appendChild(form);els.pCont.appendChild(wrap);
  }

  function exportCsv(){const rows=[[ 'Question','Type','Required','Options','ScaleMin','ScaleMax','ScaleMinLabel','ScaleMaxLabel' ]];
    survey.questions.forEach(q=>rows.push([q.text||'',typeLabels[q.type]||q.type,q.required?'Yes':'No',Array.isArray(q.options)?q.options.join(' | '):'',q.scale?.min??'',q.scale?.max??'',q.scale?.minLabel??'',q.scale?.maxLabel??'']));
    csvDownload('survey.csv',rows)
  }

  function exportPdf(){const doc=pdfDoc();if(!doc){alert('PDF export library not loaded.');return;}
    const t=(survey.title||'Survey').trim();const d=(survey.description||'').trim();
    doc.setFontSize(18);doc.text(t,40,50);if(d){doc.setFontSize(11);doc.text(doc.splitTextToSize(d,515),40,72)}
    const y=d?105:85;
    const head=[['#','Question','Type','Required']];
    const body=survey.questions.map((q,i)=>[String(i+1),q.text||'',typeLabels[q.type]||q.type,q.required?'Yes':'No']);
    if(typeof doc.autoTable==='function')doc.autoTable({head,body,startY:y,styles:{fontSize:9,cellPadding:6},headStyles:{fillColor:[37,99,235]},columnStyles:{0:{cellWidth:28},3:{cellWidth:62}}});
    doc.save('survey.pdf')
  }

  function wire(){
    els.title.addEventListener('input',save);els.desc.addEventListener('input',save);
    els.palette.addEventListener('click',e=>{const b=e.target.closest('button[data-type]');if(!b)return;resetModal(b.dataset.type);openModal(els.qModal)});
    els.addBtn.addEventListener('click',()=>{resetModal('multiple_choice');openModal(els.qModal)});
    els.qType.addEventListener('change',()=>{setEditors();if(withOptions.has(els.qType.value)){
      const cur=qsa('input[data-option-id]',els.optList).map(x=>(x.value||'').trim()).filter(Boolean);renderOptions(cur.length?cur:['Option 1','Option 2']);
    }});
    els.optAdd.addEventListener('click',()=>{const cur=qsa('input[data-option-id]',els.optList).map(x=>(x.value||'').trim());cur.push(`Option ${cur.length+1}`);renderOptions(cur)});

    const closeQ=()=>closeModal(els.qModal);
    els.qClose.addEventListener('click',closeQ);els.qCancel.addEventListener('click',closeQ);
    els.qModal.addEventListener('click',e=>{if(e.target===els.qModal)closeQ()});

    els.qSave.addEventListener('click',()=>{const d=draftFromModal();if(!d.text){alert('Please enter the question text.');return;}
      const idx=survey.questions.findIndex(q=>q.id===d.id);if(idx>=0)survey.questions[idx]=d;else survey.questions.push(d);
      save();renderList();closeQ();
    });

    els.prevBtn.addEventListener('click',()=>{save();renderPreview();openModal(els.pModal)});
    const closeP=()=>closeModal(els.pModal);
    els.pClose.addEventListener('click',closeP);els.pClose2.addEventListener('click',closeP);
    els.pModal.addEventListener('click',e=>{if(e.target===els.pModal)closeP()});

    els.saveBtn.addEventListener('click',()=>{save();alert('Survey saved in this browser.');});
    els.csvBtn.addEventListener('click',()=>{save();exportCsv()});
    els.pdfBtn.addEventListener('click',()=>{save();exportPdf()});
  }

  load();
  renderList();
  wire();

  window.__researchSurveyAPI={
    setSurvey(newSurvey){survey=newSurvey;els.title.value=survey.title||'';els.desc.value=survey.description||'';save();renderList();},
    getSurvey(){save();return survey;}
  };
}

function compInit(){
  const els={
    table:qs('#competitorTable'),addBtn:qs('#addCompetitorBtn'),csvBtn:qs('#exportCompetitorCsvBtn'),pdfBtn:qs('#exportCompetitorPdfBtn'),
    sS:qs('#swotStrengths'),sW:qs('#swotWeaknesses'),sO:qs('#swotOpportunities'),sT:qs('#swotThreats')
  };
  const KEY='udsm_research_comp_v1';
  const metrics=[
    'Market Share (%)','Pricing (USD)','Product Features (1-10)','Customer Satisfaction (1-10)','Social Media Presence (1-10)'
  ];
  let model={competitors:['Your Startup'],values:{},swot:{strengths:'',weaknesses:'',opportunities:'',threats:''}};

  const load=()=>{try{const s=JSON.parse(localStorage.getItem(KEY)||'');if(!s)return;model.competitors=Array.isArray(s.competitors)&&s.competitors.length?s.competitors:['Your Startup'];model.values=s.values||{};model.swot=s.swot||model.swot;els.sS.value=model.swot.strengths||'';els.sW.value=model.swot.weaknesses||'';els.sO.value=model.swot.opportunities||'';els.sT.value=model.swot.threats||'';}catch{}};
  const save=()=>{model.swot={strengths:els.sS.value||'',weaknesses:els.sW.value||'',opportunities:els.sO.value||'',threats:els.sT.value||''};localStorage.setItem(KEY,JSON.stringify(model))};
  const cellKey=(metric,comp)=>`${metric}__${comp}`;

  function render(){
    if(!els.table)return;
    const t=els.table;
    t.innerHTML='';
    const thead=document.createElement('thead');
    const hr=document.createElement('tr');
    const h0=document.createElement('th');h0.textContent='Category';hr.appendChild(h0);
    model.competitors.forEach((c,idx)=>{const th=document.createElement('th');
      const wrap=document.createElement('div');wrap.style.display='flex';wrap.style.gap='0.5rem';wrap.style.alignItems='center';
      const input=document.createElement('input');input.className='cell-input';input.value=c;input.title='Competitor name';
      input.addEventListener('input',()=>{
        const old=model.competitors[idx];
        const nu=input.value.trim()||`Competitor ${idx+1}`;
        model.competitors[idx]=nu;
        // remap stored values
        metrics.forEach(m=>{const ok=cellKey(m,old),nk=cellKey(m,nu);if(model.values[ok]!=null){model.values[nk]=model.values[ok];delete model.values[ok];}});
        save();
      });
      wrap.appendChild(input);
      if(idx>0){
        const del=document.createElement('button');del.className='icon-btn';del.type='button';del.innerHTML='<i class="fas fa-trash"></i>';
        del.addEventListener('click',()=>{const name=model.competitors[idx];model.competitors.splice(idx,1);metrics.forEach(m=>delete model.values[cellKey(m,name)]);save();render();});
        wrap.appendChild(del);
      }
      th.appendChild(wrap);
      hr.appendChild(th);
    });
    thead.appendChild(hr);
    t.appendChild(thead);

    const tbody=document.createElement('tbody');
    metrics.forEach(m=>{
      const tr=document.createElement('tr');
      const td0=document.createElement('td');td0.textContent=m;tr.appendChild(td0);
      model.competitors.forEach(c=>{
        const td=document.createElement('td');
        const input=document.createElement('input');input.className='cell-input';input.value=String(model.values[cellKey(m,c)]??'');
        input.addEventListener('input',()=>{model.values[cellKey(m,c)]=input.value;save();});
        td.appendChild(input);tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    t.appendChild(tbody);
  }

  function exportCsv(){
    const rows=[['Category',...model.competitors]];
    metrics.forEach(m=>{rows.push([m,...model.competitors.map(c=>String(model.values[cellKey(m,c)]??''))])});
    rows.push([]);
    rows.push(['SWOT']);
    rows.push(['Strengths',model.swot.strengths||'']);
    rows.push(['Weaknesses',model.swot.weaknesses||'']);
    rows.push(['Opportunities',model.swot.opportunities||'']);
    rows.push(['Threats',model.swot.threats||'']);
    csvDownload('competitor-analysis.csv',rows);
  }

  function exportPdf(){
    const doc=pdfDoc();if(!doc){alert('PDF export library not loaded.');return;}
    doc.setFontSize(16);doc.text('Competitor Analysis',40,50);
    const head=[['Category',...model.competitors]];
    const body=metrics.map(m=>[m,...model.competitors.map(c=>String(model.values[cellKey(m,c)]??''))]);
    if(typeof doc.autoTable==='function'){
      doc.autoTable({head,body,startY:70,styles:{fontSize:8,cellPadding:5},headStyles:{fillColor:[37,99,235]}});
      const y=doc.lastAutoTable?doc.lastAutoTable.finalY+20:420;
      doc.setFontSize(12);doc.text('SWOT',40,y);
      doc.setFontSize(10);
      const sw=[['Strengths',model.swot.strengths||''],['Weaknesses',model.swot.weaknesses||''],['Opportunities',model.swot.opportunities||''],['Threats',model.swot.threats||'']];
      doc.autoTable({head:[['Area','Notes']],body:sw,startY:y+10,styles:{fontSize:9,cellPadding:6},headStyles:{fillColor:[31,41,55]}});
    }
    doc.save('competitor-analysis.pdf');
  }

  function wire(){
    const swSave=()=>save();
    [els.sS,els.sW,els.sO,els.sT].forEach(t=>t&&t.addEventListener('input',swSave));
    els.addBtn&&els.addBtn.addEventListener('click',()=>{model.competitors.push(`Competitor ${model.competitors.length}`);save();render();});
    els.csvBtn&&els.csvBtn.addEventListener('click',()=>{save();exportCsv();});
    els.pdfBtn&&els.pdfBtn.addEventListener('click',()=>{save();exportPdf();});
  }

  load();
  render();
  wire();

  window.__researchCompetitorAPI={
    setCompetitors(list){model.competitors=list&&list.length?list:['Your Startup'];save();render();},
    getCompetitors(){save();return model;}
  };
}

function chartsInit(){
  if(!window.Chart)return;
  const tabs=qs('#chartTabs');
  const timeSel=qs('#timeRangeSelect');
  const grpSel=qs('#groupingSelect');
  const exportBtn=qs('#exportChartBtn');

  const panels=qsa('[data-chart-panel]');
  const setPanel=(key)=>{panels.forEach(p=>p.style.display=(p.dataset.chartPanel===key)?'block':'none')};

  const colors={blue:'#2563eb',green:'#10b981',orange:'#f59e0b',gray:'#1f2937'};
  const ctx={
    marketShare:qs('#marketShareChart')?.getContext('2d'),
    priceComparison:qs('#priceComparisonChart')?.getContext('2d'),
    customerSatisfaction:qs('#customerSatisfactionChart')?.getContext('2d'),
    revenueTrends:qs('#revenueTrendsChart')?.getContext('2d')
  };

  const state={active:'marketShare',charts:{}};

  function makeLabels(range,group){
    const now=new Date();
    let months=12;
    if(range==='6m')months=6;else if(range==='3y')months=36;
    if(group==='quarterly')months=Math.ceil(months/3)*3;
    const labels=[];
    for(let i=months-1;i>=0;i--){
      const d=new Date(now.getFullYear(),now.getMonth()-i,1);
      if(group==='monthly')labels.push(d.toLocaleString('en',{month:'short'})+' '+String(d.getFullYear()).slice(2));
      else if((months-1-i)%3===0){
        const q=Math.floor(d.getMonth()/3)+1;
        labels.push(`Q${q} ${d.getFullYear()}`);
      }
    }
    return labels;
  }

  function randSeries(n,min,max){const a=[];for(let i=0;i<n;i++){a.push(Math.round((min+Math.random()*(max-min))*10)/10)}return a}

  function rebuild(){
    const range=timeSel?.value||'1y';
    const group=grpSel?.value||'monthly';
    const labels=makeLabels(range,group);

    // Market share (pie) not dependent on range
    if(state.charts.marketShare){state.charts.marketShare.destroy();}
    if(ctx.marketShare){
      state.charts.marketShare=new Chart(ctx.marketShare,{type:'doughnut',data:{labels:['Your Startup','Competitor A','Competitor B','Competitor C'],datasets:[{data:[28,24,18,30],backgroundColor:[colors.blue,colors.green,colors.orange,colors.gray]}]},options:{responsive:true,plugins:{legend:{position:'bottom'}}}});
    }

    // Price comparison (bar)
    if(state.charts.priceComparison){state.charts.priceComparison.destroy();}
    if(ctx.priceComparison){
      state.charts.priceComparison=new Chart(ctx.priceComparison,{type:'bar',data:{labels:['Your Startup','Competitor A','Competitor B','Competitor C'],datasets:[{label:'Average Price (USD)',data:[12,10,14,9],backgroundColor:colors.blue}]} ,options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}});
    }

    // Customer satisfaction (radar)
    if(state.charts.customerSatisfaction){state.charts.customerSatisfaction.destroy();}
    if(ctx.customerSatisfaction){
      state.charts.customerSatisfaction=new Chart(ctx.customerSatisfaction,{type:'radar',data:{labels:['Support','Value','Quality','Ease','Availability'],datasets:[{label:'Your Startup',data:[8,7,8.5,7.5,7],borderColor:colors.blue,backgroundColor:'rgba(37,99,235,0.18)'},{label:'Competitor A',data:[7,7.2,7.8,7,6.5],borderColor:colors.green,backgroundColor:'rgba(16,185,129,0.15)'}]},options:{responsive:true,plugins:{legend:{position:'bottom'}},scales:{r:{suggestedMin:0,suggestedMax:10}}}});
    }

    // Revenue trends (line) depends on labels
    if(state.charts.revenueTrends){state.charts.revenueTrends.destroy();}
    if(ctx.revenueTrends){
      state.charts.revenueTrends=new Chart(ctx.revenueTrends,{type:'line',data:{labels,datasets:[{label:'Revenue (k USD)',data:randSeries(labels.length,8,22),borderColor:colors.blue,backgroundColor:'rgba(37,99,235,0.12)',tension:0.35,fill:true}]},options:{responsive:true,plugins:{legend:{position:'bottom'}},scales:{y:{beginAtZero:true}}}});
    }
  }

  function setActive(key){state.active=key;setPanel(key);qsa('.tab-btn',tabs).forEach(b=>b.classList.toggle('active',b.dataset.chart===key));}

  function exportActive(){
    const map={marketShare:'marketShareChart',priceComparison:'priceComparisonChart',customerSatisfaction:'customerSatisfactionChart',revenueTrends:'revenueTrendsChart'};
    const id=map[state.active];
    const canvas=qs('#'+id);
    if(canvas&&canvas.toDataURL){
      const url=canvas.toDataURL('image/png');
      const a=document.createElement('a');a.href=url;a.download=`${state.active}.png`;document.body.appendChild(a);a.click();a.remove();
      return;
    }
    const panel=qs(`[data-chart-panel="${state.active}"]`);
    if(window.html2canvas&&panel){
      window.html2canvas(panel).then(c=>{const a=document.createElement('a');a.href=c.toDataURL('image/png');a.download=`${state.active}.png`;document.body.appendChild(a);a.click();a.remove();});
    }
  }

  if(tabs){tabs.addEventListener('click',e=>{const b=e.target.closest('.tab-btn');if(!b)return;setActive(b.dataset.chart);});}
  timeSel&&timeSel.addEventListener('change',rebuild);
  grpSel&&grpSel.addEventListener('change',rebuild);
  exportBtn&&exportBtn.addEventListener('click',exportActive);

  setActive('marketShare');
  rebuild();
}

function templatesInit(){
  const btns=qsa('[data-template]');
  if(!btns.length)return;

  const templates={
    customerDiscovery:{title:'Customer Discovery Survey',description:'Understand pain points and validate the problem.',questions:[
      {type:'short_answer',text:'What best describes you (role/industry)?',required:true},
      {type:'paragraph',text:'What is the biggest challenge you face related to this problem?',required:true},
      {type:'multiple_choice',text:'How do you currently solve this problem?',required:true,options:['Manual process','Using an app','Outsourcing','Not solving it']},
      {type:'linear_scale',text:'How urgent is it to solve this problem?',required:true,scale:{min:1,max:5,minLabel:'Not urgent',maxLabel:'Very urgent'}},
      {type:'date',text:'When did you last experience this problem?',required:false}
    ]},
    marketSizing:{title:'Market Sizing Research',description:'Estimate demand and segmentation assumptions.',questions:[
      {type:'dropdown',text:'Primary customer segment',required:true,options:['Students','SMEs','Enterprises','Government','Other']},
      {type:'multiple_choice',text:'Preferred buying channel',required:true,options:['Online','In-person','Agent/Reseller','Partner']},
      {type:'short_answer',text:'Approximate monthly spend on this category (TZS)',required:false},
      {type:'linear_scale',text:'Likelihood to switch from current option',required:true,scale:{min:1,max:5,minLabel:'Very unlikely',maxLabel:'Very likely'}},
      {type:'paragraph',text:'What would convince you to switch?',required:false}
    ]},
    competitorScan:{title:'Competitor Scan Survey',description:'Collect comparative insights and positioning signals.',questions:[
      {type:'multiple_choice',text:'Which alternatives do you know?',required:true,options:['Competitor A','Competitor B','Competitor C','Other']},
      {type:'checkboxes',text:'What matters most when choosing a solution?',required:true,options:['Price','Features','Support','Brand','Ease of use']},
      {type:'linear_scale',text:'How satisfied are you with current solutions?',required:true,scale:{min:1,max:10,minLabel:'Not satisfied',maxLabel:'Very satisfied'}},
      {type:'paragraph',text:'What do you wish current solutions did better?',required:false},
      {type:'time',text:'Best time to contact you for a follow-up',required:false}
    ]},
    productFeedback:{title:'Product Feedback Survey',description:'Gather feedback on a prototype and measure satisfaction.',questions:[
      {type:'checkboxes',text:'Which features did you use?',required:false,options:['Feature A','Feature B','Feature C','Feature D']},
      {type:'linear_scale',text:'Overall satisfaction',required:true,scale:{min:1,max:5,minLabel:'Poor',maxLabel:'Excellent'}},
      {type:'multiple_choice',text:'What would you improve first?',required:true,options:['Performance','UI/UX','More features','Pricing']},
      {type:'paragraph',text:'Any other comments?',required:false},
      {type:'short_answer',text:'Email (optional)',required:false}
    ]}
  };

  const normalizeQuestions=(qs)=>qs.map(q=>({
    id:`q_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`,
    type:q.type,text:q.text,required:!!q.required,options:q.options||[],scale:q.scale||null
  }));

  btns.forEach(b=>b.addEventListener('click',()=>{
    const key=b.dataset.template;const t=templates[key];
    if(!t||!window.__researchSurveyAPI){alert('Survey tool not ready.');return;}
    window.__researchSurveyAPI.setSurvey({title:t.title,description:t.description,questions:normalizeQuestions(t.questions)});
    const target=document.getElementById('survey-builder');
    target&&target.scrollIntoView({behavior:'smooth'});
  }));
}
