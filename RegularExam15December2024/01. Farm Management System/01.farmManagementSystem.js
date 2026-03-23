function solve(input) {
    // String assoc array - масив от String
    let farmerArea = {};
    // Set assoc array - масив от Set
    let farmerTasks = {};

    // parse setup input and popilate data structures
    let n = Number(input.shift());

    // - determine how manu lines are setup lines
    // - take the next n-lines and parse them
    for (let i = 0; i < n; i++) {
        let line = input.shift();

        // - split line into name, area and tasks types
        // - split task types
        let [name, area, tasksAsString] = line.split(' ');
        let tasks = tasksAsString.split(',');

        farmerArea[name] = area;
        farmerTasks[name] = new Set(tasks);
    }
    
    // process commands until command End is received
    while(input[0] != 'End') {
        let line = input.shift();

        let tokens = line.split(' / ');
        let command = tokens[0];

        if (command == 'Execute') {
            // # Execute
            let name = tokens[1];
            let area = tokens[2];
            let task = tokens[3];

            // - verify the farmer knows how to do the task
            // - verify work area and print arror message if it doesn't match
            if (farmerArea[name] != area || !farmerTasks[name].has(task)) {
                console.log(`${name} cannot execute the task: ${task}.`);
                continue;
            }
             // - print successs message
            console.log(`${name} has executed the task: ${task}!`);
        } else if (command == 'Change Area') {
            // # Change Area
            let name = tokens[1];
            let area = tokens[2];

            // - modify farmer record and set new area
            farmerArea[name] = area;

            console.log(`${name} has changed their work area to: ${area}`);

        } else if (command =='Learn Task') {
             // # Learn
            let name = tokens[1];
            let task = tokens[2];
           
            if (farmerTasks[name].has(task)) {
                // - verify famer doesn't know task and print error message if they do
                console.log(`${name} already knows how to perform ${task}.`);
                continue;
            }
            
            // - add taks to farmer's list and print success message otherwise
            farmerTasks[name].add(task);
            console.log(`${name} has learned a new task: ${task}.`);
        }
    }

    // output:
    for (let name in farmerArea) {
         // - sort tasks by name
        let sortedTasks = [...farmerTasks[name].values()].sort((a, b) => a.localeCompare(b));

         // - print each farmer and their area
         console.log(`Farmer: ${name}, Area: ${farmerArea[name]}, Tasks: ${sortedTasks.join(', ')}`);
    }
}

solve([
    "2",
    "John garden watering,weeding",
    "Mary barn feeding,cleaning",
    "Execute / John / garden / watering",
    "Execute / Mary / garden / feeding",
    "Learn Task / John / planting",
    "Execute / John / garden / planting",
    "Change Area / Mary / garden",
    "Execute / Mary / garden / cleaning",
    "End"
  ]
  );