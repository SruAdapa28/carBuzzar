export interface newCarVariant {
abs: boolean,
airbags: number,
bodyType: string,
breakAssist: boolean
carBrand: any[],
carId: number,
carName: string,
centralLocking: boolean,
color: string[],//(6) ['Pearl Metallic Midnight Blue', 'Metallic Magma Grey', 'Metallic Silky Silver', 'Pearl Arctic White', 'Pearl Metallic Lucent Orange', 'Solid Fire Red'],
engine: number,
exShowroomPrice: number,
fastTag: number,
fuelCapacity: string,
fuelType: string,
groundClearance: number,
height: number,
id: number,
imageUrlList: string[],//(5) ['swift1', 'swift2', 'swift3', 'swift4', 'swift5']
length: number,
manufacturingYear: number,
maxPower: string,//"89 bhp @ 6000 rpm"
maxTorque: string,//"113 Nm @ 4400 rpm"
mileage: number,//23.2
onRoadPrice: number,
powerBoot: boolean,
powerDoorLocks: boolean,
powerSteering: boolean,
powerWindow: string,
rtoCharge: number,
safetyRating: number,
seatCapacity: number,
transmissionType: string,
variantName: string,
width: number
}
