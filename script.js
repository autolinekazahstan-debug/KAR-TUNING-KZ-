const menu=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));document.getElementById('year').textContent=new Date().getFullYear();const whatsappNumbers=['77773074939','77785880745'];
document.getElementById('lead-form').addEventListener('submit',e=>{
 e.preventDefault();
 const data=new FormData(e.currentTarget);
 const message=['Заявка с сайта KarTuningKZ','Имя: '+(data.get('name')||''),'Телефон: '+(data.get('phone')||''),'Автомобиль: '+(data.get('car')||'не указан'),'Запрос: '+(data.get('details')||'не указан')].join('\n');
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
