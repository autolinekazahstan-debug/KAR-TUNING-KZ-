const menu=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));document.getElementById('year').textContent=new Date().getFullYear();const whatsappNumbers=['77773074939','77785880745'];
const storeCards=[...document.querySelectorAll('.store-card')];let activeStoreFilter='all',vehicleFilter=null;const storeSearch=document.getElementById('store-search');function filterStore(){const query=(storeSearch?.value||'').trim().toLocaleLowerCase('ru');let visible=0;storeCards.forEach(card=>{const categoryMatch=activeStoreFilter==='all'||card.dataset.category===activeStoreFilter;const searchMatch=!query||(card.dataset.search||'').includes(query);const vehicleMatch=!vehicleFilter||((card.dataset.makes||'').split(',').map(x=>x.trim()).includes(vehicleFilter.make)&&vehicleFilter.tokens.some(token=>(card.dataset.models||'').toLowerCase().includes(token)));card.hidden=!(categoryMatch&&searchMatch&&vehicleMatch);if(!card.hidden)visible++;});const empty=document.getElementById('store-empty');if(empty)empty.hidden=visible!==0;}document.querySelectorAll('.store-filter').forEach(button=>button.addEventListener('click',()=>{activeStoreFilter=button.dataset.storeFilter;document.querySelectorAll('.store-filter').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});filterStore();}));if(storeSearch)storeSearch.addEventListener('input',filterStore);filterStore();
document.getElementById('lead-form').addEventListener('submit',e=>{
 e.preventDefault();
 const data=new FormData(e.currentTarget);
 const value=(key,fallback='не указано')=>String(data.get(key)||'').trim()||fallback;
 const car=[data.get('car_make'),data.get('car_model_year')].filter(Boolean).join(' ');
 const message=[
  'НОВАЯ ЗАЯВКА С САЙТА KarTuningKZ',
  '',
  'Имя: '+value('name'),
  'Телефон клиента: '+value('phone'),
  'Автомобиль: '+(car||'не указан'),
  'Интересует: '+value('service'),
  'Бюджет: '+value('budget'),
  '',
  'Пожелания клиента:',
  value('details','Нужна консультация по услуге'),
  '',
  'Пожалуйста, свяжитесь с клиентом для уточнения деталей.'
 ].join('\n');
 const note=document.getElementById('form-note');
 note.textContent='Открываем WhatsApp с подготовленной заявкой. Проверь текст в чате и нажми «Отправить» — WhatsApp не позволяет сайту отправлять сообщения без подтверждения пользователя.';
 const url='https://wa.me/'+whatsappNumbers[0]+'?text='+encodeURIComponent(message);
 window.location.href=url;
});
const aiLauncher=document.getElementById('ai-launcher');
const aiPanel=document.getElementById('ai-panel');
const aiClose=document.getElementById('ai-close');
const aiMessages=document.getElementById('ai-messages');
const aiForm=document.getElementById('ai-form');
const aiInput=document.getElementById('ai-input');
function toggleAssistant(open){aiPanel.hidden=!open;aiLauncher.setAttribute('aria-expanded',String(open));if(open)aiInput.focus();}
aiLauncher.addEventListener('click',()=>toggleAssistant(aiPanel.hidden));
aiClose.addEventListener('click',()=>toggleAssistant(false));
function addAiMessage(text,kind){const node=document.createElement('div');node.className='ai-message '+kind;node.textContent=text;aiMessages.appendChild(node);aiMessages.scrollTop=aiMessages.scrollHeight;}
function demoReply(message){const q=message.toLowerCase();if(/магнит|teyes|андроид|android/.test(q))return 'С удовольствием помогу с подбором! Напиши марку, модель и год автомобиля. Затем уточним, что важнее: бюджетный вариант, хороший экран или максимальная производительность. Это демо-консультация — совместимость подтвердит специалист.';if(/защит|плён|свет|фар|bi-led|линз/.test(q))return 'По защите и свету можем обсудить бронеплёнку, Bi-LED линзы и восстановление фар. Расскажи, пожалуйста, марку и модель автомобиля и что именно хочешь улучшить.';if(/салон|хром|электрон/.test(q))return 'Поможем сориентироваться по обновлению салона, восстановлению хрома и автомобильной электронике. Опиши автомобиль и желаемый результат — подскажем, какие детали нужно уточнить у мастера.';return 'Я помогу сориентироваться по услугам KarTuningKZ. Расскажи немного подробнее об автомобиле и задаче. Если понадобится точная цена, наличие или запись, это подтвердит специалист.';}
function sendAiMessage(message){const clean=message.trim();if(!clean)return;addAiMessage(clean,'user');aiInput.value='';window.setTimeout(()=>addAiMessage(demoReply(clean),'bot'),350);}
aiForm.addEventListener('submit',e=>{e.preventDefault();sendAiMessage(aiInput.value);});
document.querySelectorAll('.ai-quick button').forEach(button=>button.addEventListener('click',()=>sendAiMessage(button.dataset.prompt)));

/* Vehicle-first selector: images are generation-specific examples; fitment is checked before sale. */
(function(){
 const makeButtons=[...document.querySelectorAll('.make-tile')],modelSelect=document.getElementById('vehicle-model'),yearSelect=document.getElementById('vehicle-year'),systemSelect=document.getElementById('vehicle-system'),showButton=document.getElementById('vehicle-show');
 if(!makeButtons.length)return;
 const modelData={
 "BMW":[
  {name:"3 Series E90 / E91 / E92",from:2005,to:2012,old:"https://www.topgear.com/sites/default/files/images/news-article/carousel/2015/07/c6d4ed55cea19078e8a3aa80946f6889/e90_7.jpg?h=1098&w=1952",upgrade:"https://i5.walmartimages.com/asr/205884dc-0668-4d9b-8fc6-a3649bd778d5.4fd7355c77bc8eaf5e734fcd41744dba.jpeg?odnBg=FFFFFF&odnHeight=768&odnWidth=768",label:"BMW 3 Series E90 · пример до и после"},
  {name:"5 Series F10 / F11",from:2010,to:2017,old:"",upgrade:""},
  {name:"3 Series F30 / F31",from:2012,to:2019,old:"",upgrade:""}
 ],
 "Mercedes-Benz":[{name:"E-Class W212",from:2009,to:2016,old:"",upgrade:""},{name:"C-Class W204",from:2007,to:2014,old:"",upgrade:""},{name:"G-Class W463",from:2001,to:2018,old:"",upgrade:""}],
 "Toyota":[
  {name:"Camry 50 / XV50",from:2011,to:2017,old:"https://d8a6a33f-3369-444b-9b5f-793c13ff0708.selcdn.net/uploads/projects/toyota_center_iat_pilot_test/uploads/images/%D0%B2%D0%B2%D0%B2.jpg",upgrade:"https://images.satu.kz/133155910_magnitola-toyota-camry.jpg",label:"Toyota Camry XV50 · заводская панель и Android"},
  {name:"Camry 55",from:2014,to:2017,old:"https://d8a6a33f-3369-444b-9b5f-793c13ff0708.selcdn.net/uploads/projects/toyota_center_iat_pilot_test/uploads/images/%D0%B2%D0%B2%D0%B2.jpg",upgrade:"https://images.satu.kz/133155910_magnitola-toyota-camry.jpg",label:"Toyota Camry 55 · пример обновления"},
  {name:"Land Cruiser Prado 150",from:2009,to:2023,old:"",upgrade:""},
  {name:"Tundra / Sequoia",from:2007,to:2013,old:"",upgrade:""}
 ],
 "Lexus":[{name:"RX 300",from:1997,to:2003,old:"",upgrade:""},{name:"RX 350",from:2009,to:2015,old:"",upgrade:""}],
 "Hyundai":[
  {name:"Sonata 9 / YF",from:2009,to:2014,old:"https://s.auto.drom.ru/i24198/c/photos/fullsize/hyundai/sonata/hyundai_sonata_554909.jpg",upgrade:"https://awesafeinc.com/cdn/shop/products/AWESAFE-Android-10-Car-Radio-Stereo-for-Hyundai-Sonata-2011-2014-with-Built-in-Wireless-Apple-CarPlay-_-Android-Auto-AWESAFE-1675837345.jpg?v=1687664257&width=1946",label:"Hyundai Sonata YF · заводская система и Android"},
  {name:"Accent",from:2010,to:2018,old:"",upgrade:""},
  {name:"Tucson / ix35",from:2009,to:2015,old:"",upgrade:""},
  {name:"Elantra",from:2017,to:2018,old:"",upgrade:""}
 ],
 "Kia":[{name:"Rio",from:2011,to:2016,old:"https://upload.wikimedia.org/wikipedia/commons/3/3c/2012_Kia_Rio_1.4_CRDi_90_hp_5-door.jpg",upgrade:"",label:"Kia Rio · заводская панель"},{name:"Optima / K5",from:2011,to:2020,old:"",upgrade:""}],
 "Audi":[{name:"A4",from:2000,to:2016,old:"",upgrade:""},{name:"A6",from:2000,to:2016,old:"",upgrade:""}],
 "Volkswagen":[{name:"Touareg",from:2003,to:2010,old:"",upgrade:""},{name:"Polo",from:2011,to:2017,old:"",upgrade:""}],
 "Honda":[{name:"CR-V",from:2007,to:2015,old:"",upgrade:""}],"Mazda":[{name:"Mazda 6",from:2006,to:2012,old:"",upgrade:""}],
 "Subaru":[{name:"Forester",from:2008,to:2012,old:"",upgrade:""},{name:"Impreza",from:2008,to:2012,old:"",upgrade:""}],
 "Nissan":[{name:"Teana",from:2003,to:2008,old:"",upgrade:""},{name:"Qashqai",from:2007,to:2013,old:"",upgrade:""}],
 "Mitsubishi":[{name:"Pajero IV",from:2007,to:2015,old:"",upgrade:""}],"Chevrolet":[{name:"Cobalt",from:2013,to:2020,old:"",upgrade:""}],
 "Daewoo":[{name:"Gentra",from:2012,to:2016,old:"",upgrade:""}],"Lada":[{name:"Granta",from:2011,to:2023,old:"",upgrade:""}],
 "Skoda":[{name:"Yeti",from:2009,to:2017,old:"",upgrade:""}],"Renault":[{name:"Duster",from:2010,to:2021,old:"",upgrade:""}],
 "Ford":[{name:"Focus",from:2005,to:2018,old:"",upgrade:""}],"Porsche":[{name:"Cayenne",from:2002,to:2017,old:"",upgrade:""}]
 };
 let selectedMake="",selectedModel=null;
 const dashboard=document.getElementById('vehicle-dashboard'),upgrade=document.getElementById('vehicle-upgrade');
 const title=document.getElementById('showcase-title'),description=document.getElementById('showcase-description');
 const imageCaption=document.querySelector('.showcase-photo>span'),upgradeCaption=document.querySelector('.showcase-upgrade>span');
 makeButtons.forEach(btn=>{
  const logo=btn.querySelector('.make-logo');
  if(logo)logo.addEventListener('error',()=>{logo.style.display='none';const fallback=document.createElement('span');fallback.className='make-fallback';fallback.textContent='🚘';btn.insertBefore(fallback,btn.querySelector('.make-name'));},{once:true});
  btn.addEventListener('click',()=>{
   selectedMake=btn.dataset.make;selectedModel=null;
   makeButtons.forEach(b=>b.classList.toggle('active',b===btn));
   const models=modelData[selectedMake]||[];
   modelSelect.innerHTML='<option value="">Выберите модель / кузов</option>'+models.map((m,i)=>'<option value="'+i+'">'+m.name+' · '+m.from+'–'+m.to+'</option>').join('');
   modelSelect.disabled=!models.length;yearSelect.innerHTML='<option value="">Сначала выберите модель</option>';yearSelect.disabled=true;
   title.textContent=selectedMake+' — выберите модель';
   description.textContent='Выберите поколение и год. Покажем заводской интерьер, варианты Android-мультимедиа и отдельно отметим, что требует проверки по VIN и фото панели.';
   document.getElementById('finder-count').textContent='Выберите модель';
   document.getElementById('finder-message').textContent='После выбора модели покажем товары каталога, а также подскажем, какие рамка, CANBUS и проводка потребуются для проверки.';
  });
 });
 modelSelect.addEventListener('change',()=>{
  const item=modelData[selectedMake]?.[Number(modelSelect.value)];selectedModel=item||null;
  yearSelect.innerHTML='<option value="">Выберите год</option>';
  if(item){for(let y=item.from;y<=item.to;y++){const o=document.createElement('option');o.value=String(y);o.textContent=String(y);yearSelect.appendChild(o);}yearSelect.disabled=false;
   title.textContent=selectedMake+' '+item.name;
   description.textContent='Годы выпуска: '+item.from+'–'+item.to+'. На фото — пример штатного интерьера этого поколения. Подбор новой системы зависит от комплектации, размера заводского экрана, разъёмов и аудиосистемы.';
   if(item.old){dashboard.src=item.old;dashboard.alt='Штатная панель '+selectedMake+' '+item.name;dashboard.hidden=false;imageCaption.textContent='01 / ШТАТНЫЙ ИНТЕРЬЕР · '+selectedMake.toUpperCase();}
   else{dashboard.removeAttribute('src');dashboard.alt='Фото штатной панели уточняется';dashboard.hidden=true;imageCaption.textContent='01 / ФОТО ШТАТНОЙ ПАНЕЛИ УТОЧНЯЕТСЯ';}
   if(item.upgrade){upgrade.src=item.upgrade;upgrade.alt='Пример Android-мультимедиа для '+selectedMake+' '+item.name;upgrade.hidden=false;upgradeCaption.textContent='02 / ПРИМЕР ANDROID-ОБНОВЛЕНИЯ';}
   else{upgrade.src='https://teyes.org.kz/images/cc32k.png';upgrade.alt='Универсальная мультимедийная система T’EYES CC3 2K';upgrade.hidden=false;upgradeCaption.textContent='02 / УНИВЕРСАЛЬНАЯ СИСТЕМА · СОВМЕСТИМОСТЬ ПРОВЕРЯЕТСЯ';}
  }
 });
 function applyVehicle(){
  if(!selectedMake||!selectedModel){document.getElementById('finder-message').textContent='Сначала выберите марку и модель автомобиля.';return;}
  const year=yearSelect.value||'не выбран',model=selectedModel.name;
  vehicleFilter={make:selectedMake,tokens:model.toLowerCase().split(/[ /]+/).filter(x=>x.length>2)};
  let count=0;
  document.querySelectorAll('.store-card').forEach(card=>{
   const makes=(card.dataset.makes||'').split(',').map(x=>x.trim());
   const models=(card.dataset.models||'').toLowerCase();
   const modelKey=model.toLowerCase().split(/[ /]+/).filter(x=>x.length>2);
   const fit=makes.includes(selectedMake)&&vehicleFilter.tokens.some(token=>models.includes(token));
   card.hidden=!fit;if(fit)count++;
  });
  document.querySelectorAll('.store-filter').forEach(b=>{b.classList.toggle('active',b.dataset.storeFilter==='all');b.setAttribute('aria-pressed',String(b.dataset.storeFilter==='all'));});
  activeStoreFilter='all';if(storeSearch)storeSearch.value='';
  document.getElementById('finder-count').textContent=count?count+' позиции каталога':'Нет подтверждённых карточек';
  document.getElementById('finder-message').textContent=count?
   'Ниже — позиции, в карточках которых указана выбранная модель. До покупки всё равно сверяем год, кузов, штатную систему и разъёмы.':
   'Для '+selectedMake+' '+model+' ('+year+') пока нет карточки с подтверждённой совместимостью. Это не значит, что решения нет: подберём Android-экран, рамку, CANBUS и проводку после фото центральной панели и проверки штатной системы. Универсальные модели не выдаём за готовую установку.';
  const msg='Подбор мультимедиа для '+selectedMake+' '+model+', год '+year+'. Штатная система: '+(systemSelect.value||'не знаю')+'. Нужны Android-магнитола, рамка, CANBUS и проводка. Подскажите совместимое решение.';
  document.getElementById('vehicle-contact').href='https://wa.me/77773074939?text='+encodeURIComponent(msg);
  document.getElementById('finder-results').scrollIntoView({behavior:'smooth',block:'nearest'});
 }
 showButton.addEventListener('click',applyVehicle);
})();