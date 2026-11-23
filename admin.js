/* Supabase settings are intentionally blank until the project owner creates a database. */
const SUPABASE_URL = "";
const SUPABASE_ANON_KEY = "";
const ready = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase);
const $ = id => document.getElementById(id);
const loginHint = $("loginHint");
if (ready) {
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  $("loginBtn").disabled = false;
  loginHint.textContent = "Вход защищён учётной записью Supabase. Доступ выдаётся только администратору.";
  const refresh = async () => {
    const {data,error}=await client.from("products").select("*").order("created_at",{ascending:false});
    if(error){$("products").textContent="Не удалось загрузить товары: "+error.message;return;}
    $("products").replaceChildren(...data.map(p=>{
      const card=document.createElement("div");card.className="product";
      const title=document.createElement("div");title.innerHTML="";
      const strong=document.createElement("strong");strong.textContent=p.name;
      const small=document.createElement("small");small.textContent=(p.category||"")+(p.available?" · В наличии":" · Нет в наличии");
      title.append(strong,small);
      const price=document.createElement("input");price.type="number";price.min="0";price.value=p.price;price.setAttribute("aria-label","Цена");
      const save=document.createElement("button");save.textContent="Сохранить";
      save.onclick=async()=>{const {error}=await client.from("products").update({price:Number(price.value)}).eq("id",p.id);if(error)alert(error.message);else{save.textContent="Сохранено";setTimeout(()=>save.textContent="Сохранить",1500);}};
      const del=document.createElement("button");del.className="secondary";del.textContent="Удалить";
      del.onclick=async()=>{if(!confirm("Удалить "+p.name+"?"))return;const {error}=await client.from("products").delete().eq("id",p.id);if(error)alert(error.message);else refresh();};
      card.append(title,price,save,del);return card;
    }));
  };
  $("loginBtn").onclick=async()=>{const {error}=await client.auth.signInWithPassword({email:$("email").value,password:$("password").value});if(error){loginHint.textContent=error.message;return;}$("login").hidden=true;$("manager").hidden=false;refresh();};
  $("logoutBtn").onclick=async()=>{await client.auth.signOut();$("manager").hidden=true;$("login").hidden=false;};
  $("productForm").onsubmit=async e=>{e.preventDefault();const row={name:$("name").value,category:$("category").value,price:Number($("price").value),old_price:$("oldPrice").value?Number($("oldPrice").value):null,available:$("available").checked};const {error}=await client.from("products").insert(row);if(error){alert(error.message);return;}e.target.reset();$("available").checked=true;refresh();};
} else {
  $("loginBtn").disabled=true;
  loginHint.textContent="Подключение базы ещё не настроено. Смотри ADMIN_SETUP.md — там пошагово и без публикации секретов.";
}