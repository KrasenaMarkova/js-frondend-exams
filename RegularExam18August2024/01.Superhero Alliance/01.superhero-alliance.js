function solve (input) {
    // вземаме данни за супер героите
    const heroesCount = input.shift();
    const heroesInput = input.splice(0, heroesCount);

    const heroes = heroesInput.reduce((heroes, hero) => {
        let [name, power, energy] = hero.split('-');
        power = power.split(',');

        heroes[name] = {power, energy: Number(energy)}

        return heroes;
    }, {});


    // вземаме командите от входните данни
    input.forEach(entry => {
        const line = entry.split(' * ');
        // вземаме първият елемент, който е конкретната команда
        const command = line.shift();

        // името на супергероя
        let name = '';

        switch(command) {
            case 'Use Power':
//•	Check if the superhero has the specified superpower and enough energy. If both conditions are met, they perform the superpower and reduce their energy accordingly, then print:
                name = line.shift();
                let [usedPower, usedEnergy] = line;
                // тъй като енергията е подадена като  стринг
                usedEnergy = Number(usedEnergy);

                if ((heroes[name].energy - usedEnergy) > 0 && heroes[name].power.includes(usedPower)) {
                    // изчисляваме колко енергия остава на героя ни
                    heroes[name].energy = heroes[name].energy - usedEnergy;
                    console.log(`${name} has used ${usedPower} and now has ${heroes[name].energy} energy!`);
                } else {
                    console.log(`${name} is unable to use ${usedPower} or lacks energy!`);
                }
                break;
            case 'Train':
    //•	Increase the superhero's energy by the specified amount (training energy). If this action would exceed the maximum energy level of 100, set the energy to 100. Print:
                name = line.shift();
                let [gainedEnergy] = line;
                gainedEnergy = Number(gainedEnergy);

                if (heroes[name].energy < 100) {
                    heroes[name].energy += gainedEnergy;

                    if (heroes[name].energy > 100) {
                        const remainder = heroes[name].energy - 100;
                        gainedEnergy = gainedEnergy - remainder;
                        heroes[name].energy = 100;
                    }
                    console.log(`${name} has trained and gained ${gainedEnergy} energy!`);
                } else {
                    console.log(`${name} is already at full energy!`);
                }
                break;
            case 'Learn':
                name = line.shift();
                let [gainedPower] = line;

                if (heroes[name].power.includes(gainedPower)) {
                    console.log(`${name} already knows ${gainedPower}.`);
                } else {
                    heroes[name].power.push(gainedPower);
                    console.log(`${name} has learned ${gainedPower}!`);
                }
                break;
        }
    });

    Object.keys(heroes).forEach(name => {
        let output = '';

        output += `Superhero: ${name}\n`;
        output += `- Superpowers: ${heroes[name].power.join(', ')}\n`;
        output += `- Energy: ${heroes[name].energy}`;

        console.log(output);
    });
}


solve( ([
    "3",
    "Iron Man-Repulsor Beams,Flight-80",
    "Thor-Lightning Strike,Hammer Throw-10",
    "Hulk-Super Strength-60",
    "Use Power * Iron Man * Flight * 30",
    "Train * Thor * 20",
    "Train * Hulk * 50",
    "Learn * Hulk * Thunderclap",
    "Use Power * Hulk * Thunderclap * 70",
    "Evil Defeated!"
])
);

// solve( ([
//     "2",
//     "Iron Man-Repulsor Beams,Flight-20",
//     "Thor-Lightning Strike,Hammer Throw-100",
//     "Train * Thor * 20",
//     "Use Power * Iron Man * Repulsor Beams * 30",
//     "Evil Defeated!"
// ])
// );
// solve( ([
//     "2",
//     "Iron Man-Repulsor Beams,Flight-100",
//     "Thor-Lightning Strike,Hammer Throw-50",
//     "Train * Thor * 20",
//     "Learn * Thor * Hammer Throw",
//     "Use Power * Iron Man * Repulsor Beams * 30",
//     "Evil Defeated!"
// ])
// );