// Window Onload \\

window.onload = ft_get_token;

let api_token = undefined;

function ft_get_token()
{
	fetch("http://localhost:3000/private")
	.then(response=>response.json())
	.then(datos=>
	{
		api_token = datos.token;
		ft_token_info(datos.token)
	});
}

function ft_token_info(api_token)
{
	fetch("https://api.intra.42.fr/oauth/token/info",{
	headers:
		{
			Authorization: `Bearer ${api_token}`
		}
	})
	.then(response=>response.json())
	.then(datos=>(console.log(datos)))
}

/**********************************************************************/

// Swap Image \\

pick_two.addEventListener("change",() =>{
	pick_two_img.setAttribute('src', "src/" + pick_two.selectedOptions[0].value + '.ico')
})

pick_one.addEventListener("change",() =>{
	pick_one_img.setAttribute('src', "src/" + pick_one.selectedOptions[0].value + '.ico')
})

/**********************************************************************/

// Form and actions \\

let user = undefined;
let user_two = undefined;
let form = document.getElementById("form");
let form_two = document.getElementById("form_two");
let button_fight = document.getElementById("button");

player_one = 0;
player_two = 0;
power = 0;		//	Power player one
power_two = 0;	//	Power player two
streak_one = 0;	// Streaks wins player one
streak_two = 0;	// Streaks wins player two

form.onsubmit = (e) => ft_get_data_user(e);				//	When form_1 is sended.
form_two.onsubmit = (e) => ft_get_data_user_two(e);		//	When form_2 is sended.
button_fight.onclick = (e) => ft_fight(e);				//	When press "FIGHT" buttom.

async function ft_fight(e){
	ft_get_data_user(e);
	ft_get_data_user_two(e);
	setTimeout(() => ft_victory(e), 1000);
}

function ft_get_data_user(e)
{
	user = document.getElementById("username").value;

	if (e !== undefined)
	e.preventDefault();
	fetch(`https://api.intra.42.fr/v2/users/${user}`,{
		headers:
			{
				Authorization: `Bearer ${api_token}`
			}
		})
		.then(response=>response.json())
		.then(datos=>
		{
			console.log(datos);
			player_one = datos.first_name;
			power = datos.correction_point + datos.wallet;
			document.getElementById("showUser").innerHTML = 'Skills'
			document.getElementById("showPower").innerHTML = 'Power : ' + power;
			document.getElementById("showPick").innerHTML = 'Character : ' + pick_one.selectedOptions[0].value
		})
}

function ft_get_data_user_two(e)
{
	user = document.getElementById("username_two").value;

	if (e !== undefined)
		e.preventDefault();
	fetch(`https://api.intra.42.fr/v2/users/${user}`,{
		headers:
			{
				Authorization: `Bearer ${api_token}`
			}
		})
		.then(response=>response.json())
		.then(datos=>
		{
			console.log(datos);
			player_two = datos.first_name;
			power_two = datos.correction_point + datos.wallet;
			document.getElementById("showUser_two").innerHTML = 'Skills';
			document.getElementById("showPower_two").innerHTML = 'Power : ' + power_two;
			document.getElementById("showPick_two").innerHTML = 'Character : ' + pick_two.selectedOptions[0].value
		})
}

function ft_victory(e)
{
	if (power > 0 && power_two > 0)
	{
		if (power > power_two) // If player ONE wins.
		{
			streak_one += 1;
			streak_two = 0;
			document.getElementById("victory").innerHTML = '¡' + player_one + ' wins!' + '<br>' + 'Streak\'s = ' + streak_one;
		}
		else if (power_two > power) // If player TWO wins.
		{
			streak_one = 0;
			streak_two += 1;
			document.getElementById("victory").innerHTML = '¡' + player_two + ' wins!' + '<br>' + 'Streak\'s = ' + streak_two;
		}
	}
}

/**********************************************************************/
