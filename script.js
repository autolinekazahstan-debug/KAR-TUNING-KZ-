const menu=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));document.getElementById('year').textContent=new Date().getFullYear();const whatsappNumbers=['77773074939','77785880745'];
const storeCards=[...document.querySelectorAll('.store-card')];let activeStoreFilter='all';const storeSearch=document.getElementById('store-search');function filterStore(){const query=(storeSearch?.value||'').trim().toLocaleLowerCase('ru');let visible=0;storeCards.forEach(card=>{const categoryMatch=activeStoreFilter==='all'||card.dataset.category===activeStoreFilter;const searchMatch=!query||(card.dataset.search||'').includes(query);card.hidden=!(categoryMatch&&searchMatch);if(!card.hidden)visible++;});const empty=document.getElementById('store-empty');if(empty)empty.hidden=visible!==0;}document.querySelectorAll('.store-filter').forEach(button=>button.addEventListener('click',()=>{activeStoreFilter=button.dataset.storeFilter;document.querySelectorAll('.store-filter').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});filterStore();}));if(storeSearch)storeSearch.addEventListener('input',filterStore);filterStore();
document.getElementById('lead-form').addEventListener('submit',e=>{
 e.preventDefault();
 const data=new FormData(e.currentTarget);
 const message=['Заявка с сайта KarTuningKZ','Имя: '+(data.get('name')||''),'Телефон: '+(data.get('phone')||''),'Автомобиль: '+[data.get('car_make'),data.get('car_model_year')].filter(Boolean).join(' ')+' (если не указан — уточнить у клиента)','Бюджет: '+(data.get('budget')||'не указан'),'Запрос: '+(data.get('details')||'не указан')].join('\n');
 const encoded=encodeURIComponent(message);
 const chooser=document.createElement('div');
 chooser.className='wa-submit-choices';
 chooser.innerHTML='<p>Выбери, на какой номер отправить заявку:</p><a href="https://wa.me/'+whatsappNumbers[0]+'?text='+encoded+'" target="_blank" rel="noopener noreferrer">WhatsApp 1 · +7 777 307 4939 ↗</a><a href="https://wa.me/'+whatsappNumbers[1]+'?text='+encoded+'" target="_blank" rel="noopener noreferrer">WhatsApp 2 · +7 778 588 0745 ↗</a>';
 const previous=document.querySelector('.wa-submit-choices');
 if(previous)previous.remove();
 e.currentTarget.appendChild(chooser);
 document.getElementById('form-note').textContent='Сообщение подготовлено. Нажми на один из номеров выше и отправь его в открывшемся WhatsApp.';
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

/* Vehicle-first fitment selector */
(function(){
 const makeButtons=[...document.querySelectorAll('.make-tile')], modelSelect=document.getElementById('vehicle-model'), yearSelect=document.getElementById('vehicle-year'), systemSelect=document.getElementById('vehicle-system'), showButton=document.getElementById('vehicle-show');
 if(!makeButtons.length)return;
 const modelData={
 "BMW":[["3 Series E90 / E91 / E92","2005–2012","https://i.auto-bild.de/ir_img/1/2/5/3/6/0/8/BMW-3er-E90-1200x800-d3015eecd9a2b2c9.jpg"],["5 Series F10 / F11","2010–2017","https://www.autocentrum.pl/ac-file/article/5edeb2e8caae8f0da54d868b/bmw-serii-5-f10-f11-2010-2017-poradnik-kupujacego-05.jpg"],["3 Series F30 / F31","2012–2019",""]],
 "Mercedes-Benz":[["E-Class W212","2009–2016","https://images.autoreview.nl/original/interieur-8d1f14.jpg"],["C-Class W204","2007–2014",""],["G-Class W463","2001–2018",""]],
 "Toyota":[["Camry 50 / XV50","2011–2017",""],["Camry 55","2014–2017",""],["Land Cruiser Prado 150","2009–2023",""],["Tundra / Sequoia","2007–2013",""]],
 "Lexus":[["RX 300","1997–2003",""],["RX 350","2009–2015",""]],
 "Hyundai":[["Sonata 9 / YF","2009–2014",""],["Accent","2017–2018",""],["Tucson / ix35","2009–2015",""],["Elantra","2017–2018",""]],
 "Kia":[["Rio","2011–2016",""],["Optima / K5","2011–2020",""]],
 "Audi":[["A4 / A6 — уточнить кузов","2000–2016",""]],"Volkswagen":[["Touareg","2003–2010",""],["Polo","2011–2017",""]],
 "Honda":[["CR-V","2007–2015",""]],"Mazda":[["Mazda 6","2006–2012",""]],"Subaru":[["Forester","2008–2012",""],["Impreza","2008–2012",""]],
 "Nissan":[["Teana","2003–2008",""],["Qashqai","2007–2013",""]],"Mitsubishi":[["Pajero IV","2007–2015",""]],
 "Chevrolet":[["Cobalt","2013–2020",""]],"Daewoo":[["Gentra","2012–2016",""]],"Lada":[["Granta","2011–2023",""]],
 "Skoda":[["Yeti","2009–2017",""]],"Renault":[["Duster","2010–2021",""]],"Ford":[["Focus","2005–2018",""]],"Porsche":[["Cayenne","2002–2017",""]]
 };
 let selectedMake="";
 function fillModels(){const models=modelData[selectedMake]||[];modelSelect.innerHTML='<option value="">Выберите модель / кузов</option>'+models.map((m,i)=>'<option value="'+i+'">'+m[0]+' · '+m[1]+'</option>').join('');modelSelect.disabled=!models.length;yearSelect.innerHTML='<option value="">Выберите модель</option>';yearSelect.disabled=true;}
 makeButtons.forEach(btn=>btn.addEventListener('click',()=>{selectedMake=btn.dataset.make;makeButtons.forEach(b=>b.classList.toggle('active',b===btn));fillModels();document.getElementById('showcase-title').textContent=selectedMake+' — выберите модель и поколение';document.getElementById('showcase-description').textContent='Для '+selectedMake+' важно определить кузов, год выпуска и штатную мультимедийную систему.';}));
 modelSelect.addEventListener('change',()=>{const item=modelData[selectedMake]?.[Number(modelSelect.value)];yearSelect.innerHTML='<option value="">Выберите год выпуска</option>';if(item){item[1].split('–').forEach(y=>{const op=document.createElement('option');op.value=y;op.textContent=y;yearSelect.appendChild(op)});yearSelect.disabled=false;if(item[2]){const img=document.getElementById('vehicle-dashboard');img.src=item[2];img.alt='Пример заводской панели '+selectedMake+' '+item[0];}document.getElementById('showcase-title').textContent=selectedMake+' '+item[0];document.getElementById('showcase-description').textContent='Поколение '+item[1]+'. Сверяем форму центральной консоли, размер штатного экрана и тип заводской системы. Изображение — ориентир по интерьеру, не подтверждение совместимости.';}});
 function applyVehicle(){if(!selectedMake||modelSelect.value===""){document.getElementById('finder-message').textContent='Сначала выберите марку и модель автомобиля.';return;}
 const item=modelData[selectedMake][Number(modelSelect.value)],selectedModel=item[0],selectedYear=yearSelect.value||item[1];let count=0;
 document.querySelectorAll('.store-card').forEach(card=>{const exact=card.dataset.makes===selectedMake;const model=(card.dataset.models||'').toLowerCase();const tokens=selectedModel.toLowerCase().split(/[ /]+/).filter(t=>t.length>2);const match=exact&&tokens.some(token=>model.includes(token));card.hidden=!match;if(match)count++;});
 document.querySelectorAll('.store-filter').forEach(b=>{b.classList.toggle('active',b.dataset.storeFilter==='all');b.setAttribute('aria-pressed',String(b.dataset.storeFilter==='all'));});activeStoreFilter='all';if(storeSearch)storeSearch.value='';
 document.getElementById('finder-count').textContent=count?count+' позиции в каталоге':'Пока нет подтверждённых позиций';
 document.getElementById('finder-message').textContent=count?'Ниже показаны позиции, привязанные к выбранной марке и модели. Перед заказом подтвердим поколение, разъёмы и штатные функции.':'Для '+selectedMake+' '+selectedModel+' ('+selectedYear+') пока нет опубликованной карточки с подтверждённой совместимостью. Универсальные устройства не выдаём за готовое решение — отправьте фото торпеды, и подберём экран, рамку, CANBUS и проводку.';
 const message='Подбор оборудования для автомобиля: '+selectedMake+' '+selectedModel+', год '+selectedYear+'. Штатная система: '+(systemSelect.value||'не знаю')+'. Прошу подобрать магнитолу, рамку, CANBUS и комплект проводки.';
 document.getElementById('vehicle-contact').href='https://wa.me/77773074939?text='+encodeURIComponent(message);document.getElementById('finder-results').scrollIntoView({behavior:'smooth',block:'nearest'});
 }
 showButton.addEventListener('click',applyVehicle);
})();
