'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout{
 date = new Date();
 id = (this.date + '').slice(-10);

 constructor(coords, distance, duration){
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
 }
}

class Running extends Workout{
    type = 'running'
    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
    }
    calcPace(){
        this.pace = this.duration/this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling'
    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }
    calcSpeed(){
        this.speed = this.distance/(this.duration/60);
        return this.speed;
    }
}



class App {
     #map
     #mapEvent
     #workouts = []


    constructor(){
       this._getPosition();
       this._resetForm();
    }

    _resetForm(){
        form.reset();
    }

    _getPosition(){
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
            alert('could not find you device');
        })
    }

    _loadMap(position){
        console.log('_loadMap activated')
        const {latitude, longitude} = position.coords;
        const coords = [latitude, longitude];
    
        this.#map = L.map('map').setView(coords, 13);
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        
        this.#map.on('click', this._showForm.bind(this)) //creates 'click' event, sends to _showForm()
    }

    _showForm(e){ // receives 'click' event, saves to variable (has lat, lng location of click)
        
        this.#mapEvent = e;

        form.classList.remove('hidden');
        inputDistance.focus();

        this._toggleElevationField();

        form.addEventListener('submit', this._newWorkout.bind(this)); //creates 'submit' event
    }
    

    _toggleElevationField(){
        inputType.addEventListener('change', function(){
            inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
            inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
        })
    }

    _newWorkout(e){
        e.preventDefault();
        console.log(`form has been submitted & the inputDistance value is ${inputDistance.value}`)
        

        /////////// Validate input code /////////////

          ////  Get Data from form  ////

        if(inputDistance.value.length == 0){
            console.log('distance input is blank');
        }  else{
            const distance = +inputDistance.value;
        }

        if(inputDuration.value.length == 0){
            console.log('duration input is blank');
        } else{
            const duration = +inputDuration.value;
        }
        /*
        const type = inputType.value;        
        let workout;
        const {lat,lng} = this.#mapEvent.latlng;
        const coords = [lat, lng];
         
        //Check Data is valid & exists
        //Need to make sure each form input is not blank
        //Need clicking the map to reset

        ////  Function Declarations: 
        ////  return true if input values are NUMBERS and POSITIVE ////

        //.every() : returns 'true' if every input is true (finite & non-negative)
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp))
        const positiveInputs = (...inputs) => inputs.every(inp => inp >= 0)


        // Checking valid inputs for RUNNING

        if(type === 'running'){
            const cadence = +inputCadence.value;
            //all fields must be finite: distance, duration & cadence must all be positive
            if(!validInputs(distance, duration, cadence) || !positiveInputs(distance, duration, cadence)){
                return alert('One or more inputs is not a positive number');
                
            } else{
                //Create Running Object instance
                workout = new Running(coords, distance, duration, cadence)
            }
        }

        // Checking valid inputs for CYCLING

        if(type === 'cycling'){
            const elevation = +inputElevation.value;
            //all fields must be finite, distance, duration must be positive.. elevation may be negative
            if(!validInputs(distance, duration, elevation) || !positiveInputs(distance, duration)){
                return alert('Distance or Duration is not a positive number');
            } else{
                // Create Cycling Workout object instance
                workout = new Cycling(coords, distance, duration, elevation);
            }

            
        }

        //Push the workout object instance to the Workout Array
        console.log(workout)
        this.#workouts.push(workout);
        console.log(this.#workouts)



        //Display Marker
        
        this.renderWorkoutMarker(workout)
    
        //Clear Form Fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

        //Hide Form
        form.classList.add('hidden')

        //reset form
        // this._resetForm();
        
        */
    }

    renderWorkoutMarker(workout){
        L.marker(workout.coords).addTo(this.#map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick:false,
            className: `${workout.type}-popup`,
        }
        )).setPopupContent(workout.type)
        .openPopup()
    }

}

const app = new App();




