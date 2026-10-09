	const menuButton=document.getElementById('menu');
	const navigation=document.getElementById('nav');
	menuButton.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'×':'☰';});
	navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰';}));
	document.getElementById('year').textContent=new Date().getFullYear();
	if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');observer.unobserve(entry.target);}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(item=>observer.observe(item));}else{document.querySelectorAll('.reveal').forEach(item=>item.classList.add('show'));}
