export type Filed = {
  name: string;
  label: string;
  type: string;
};

export type Section = {
  title: string;
  fields: Filed[];
};

export const specificationFields: Record<string, Section> = {
  aircraft: {
    title: 'Aircraft Information',
    fields: [
      { name: 'MANUFACTURE_DATE', label: 'Manufacture Date', type: 'date' },
      { name: 'AIRCRAFT_TYPE', label: 'Aircraft Type', type: 'text' },
      { name: 'COUNTRY_OF_REGISTRATION', label: 'Country of Registration', type: 'text' },
      { name: 'REGISTRATION_DATE', label: 'Registration Date', type: 'date' },
      { name: 'REGISTRATION', label: 'Registration Number', type: 'text' },
      { name: 'MSN', label: 'Manufacturer Serial Number', type: 'text' },
      { name: 'ENGINES', label: 'Number of Engines', type: 'number' },
      { name: 'APU', label: 'Auxiliary Power Unit Type', type: 'text' },
      { name: 'PREVIOUS_OPERATOR', label: 'Previous Operator', type: 'text' },
      { name: 'AOC_CERTIFICATE', label: 'Air Operator Certificate', type: 'text' },
      { name: 'RVSM', label: 'Reduced Vertical Separation Minimum', type: 'boolean' },
      { name: 'APPROACH_CAT', label: 'Approach Category', type: 'text' },
      { name: 'THRUST_RATING', label: 'Thrust Rating', type: 'text' },
    ],
  },
  operatingLimitations: {
    title: 'Operating Limitations',
    fields: [
      { name: 'MTW', label: 'Maximum Taxi Weight', type: 'number' },
      { name: 'MTOW', label: 'Maximum Take-off Weight', type: 'number' },
      { name: 'MZFW', label: 'Maximum Zero Fuel Weight', type: 'number' },
      { name: 'MLW', label: 'Maximum Landing Weight', type: 'number' },
    ],
  },
  configuration: {
    title: 'Configuration Details',
    fields: [
      { name: 'MLG_BRAKE_FANS', label: 'Main Landing Gear Brake Fans', type: 'boolean' },
      { name: 'WINGTIP_TYPE', label: 'Wingtip Type', type: 'text' },
      { name: 'FOPP', label: 'Flight Operational Passenger Protection', type: 'boolean' },
      { name: 'SEATING_CONFIGURATION', label: 'Seating Configuration', type: 'text' },
      { name: 'CLASS', label: 'Class', type: 'text' },
      { name: 'CABIN_TYPE', label: 'Cabin Type', type: 'text' },
      { name: 'SEAT_PITCH', label: 'Seat Pitch', type: 'text' },
      { name: 'SEAT_MANUFACTURER', label: 'Seat Manufacturer', type: 'text' },
      { name: 'SEAT_MODEL', label: 'Seat Model', type: 'text' },
      { name: 'SEAT_MATERIAL_AND_COLOR', label: 'Seat Material and Color', type: 'text' },
      { name: 'SEAT_RECLINE', label: 'Seat Recline Angle', type: 'text' },
      { name: 'CLASS_DIVIDER', label: 'Class Divider', type: 'boolean' },
      { name: 'COCKPIT_CABIN_CREW_SEATS', label: 'Cockpit and Cabin Crew Seats', type: 'number' },
      { name: 'GALLEYS', label: 'Galleys', type: 'number' },
      { name: 'OVENS', label: 'Ovens', type: 'text' },
      { name: 'WATER_BOILERS', label: 'Water Boilers', type: 'text' },
      { name: 'TYPE_OF_TROLLEYS', label: 'Type of Trolleys', type: 'text' },
      { name: 'LAVATORIES', label: 'Lavatories', type: 'number' },
    ],
  },
  airframe: {
    title: 'Airframe Details',
    fields: [
      { name: 'TOTAL_TIME_SINCE_NEW', label: 'Total Time Since New (hours)', type: 'number' },
      { name: 'TOTAL_CYCLES_SINCE_NEW', label: 'Total Cycles Since New', type: 'number' },
      { name: 'CHECK_24M_LAST_DONE', label: 'Last 24M Check Date', type: 'date' },
      { name: 'CHECK_24M_NEXT_DUE', label: 'Next 24M Check Date', type: 'date' },
      { name: 'CHECK_6Y_LAST_DONE', label: 'Last 6-Year Check Date', type: 'date' },
      { name: 'CHECK_6Y_NEXT_DUE', label: 'Next 6-Year Check Date', type: 'date' },
      { name: 'CHECK_12Y_LAST_DONE', label: 'Last 12-Year Check Date', type: 'date' },
      { name: 'CHECK_12Y_NEXT_DUE', label: 'Next 12-Year Check Date', type: 'date' },
    ],
  },
  engineAPU: {
    title: 'Engine and APU Details',
    fields: [
      { name: 'AIRCRAFT_ID', label: 'Aircraft ID', type: 'number' },
      { name: 'COMPONENT_TYPE', label: 'Component Type', type: 'text' },
      { name: 'CYCLES_SINCE_LAST_PR_SHOP_VISIT', label: 'Cycles Since Last PR Shop Visit', type: 'number' },
      { name: 'CYCLES_SINCE_LAST_SHOP_VISIT', label: 'Cycles Since Last Shop Visit', type: 'number' },
      { name: 'ENGINE_APU_ID', label: 'Engine APU ID', type: 'number' },
      { name: 'SERIAL_NUMBER', label: 'Serial Number', type: 'text' },
      { name: 'TIME_SINCE_LAST_PR_SHOP_VISIT', label: 'Time Since Last PR Shop Visit (hours)', type: 'number' },
      { name: 'TIME_SINCE_LAST_SHOP_VISIT', label: 'Time Since Last Shop Visit (hours)', type: 'number' },
      { name: 'TOTAL_CYCLES_SINCE_NEW', label: 'Total Cycles Since New', type: 'number' },
      { name: 'TOTAL_TIME_SINCE_NEW', label: 'Total Time Since New (hours)', type: 'number' },
      { name: 'TYPE', label: 'Model/Type of the Component', type: 'text' },
    ],
  },
  landingGear: {
    title: 'Landing Gear Details',
    fields: [
      { name: 'LANDING_GEAR_ID', label: 'Landing Gear ID', type: 'number' },
      { name: 'AIRCRAFT_ID', label: 'Aircraft ID', type: 'number' },
      { name: 'COMPONENT_TYPE', label: 'Component Type', type: 'text' },
      { name: 'PART_NUMBER', label: 'Part Number', type: 'text' },
      { name: 'SERIAL_NUMBER', label: 'Serial Number', type: 'text' },
      { name: 'TOTAL_TIME_SINCE_NEW', label: 'Total Time Since New (hours)', type: 'number' },
      { name: 'TOTAL_CYCLES_SINCE_NEW', label: 'Total Cycles Since New', type: 'number' },
      { name: 'CYCLES_SINCE_OVERHAUL', label: 'Cycles Since Last Overhaul', type: 'number' },
      { name: 'NEXT_OVERHAUL_DATE', label: 'Next Overhaul Date', type: 'date' },
    ],
  },
  avionics: {
    title: 'Avionics Details',
    fields: [
      { name: 'AVIONICS_ID', label: 'Avionics ID', type: 'number' },
      { name: 'AIRCRAFT_ID', label: 'Aircraft ID', type: 'number' },
      { name: 'ATA_CHAPTER', label: 'ATA Chapter', type: 'text' },
      { name: 'COMPONENT_NAME', label: 'Component Name', type: 'text' },
      { name: 'COMPONENT_VALUE', label: 'Component Value/Type', type: 'text' },
    ],
  },
};

export const sectionMapping: Record<string, string[]> = {
  frontView: ['aircraft', 'operatingLimitations'],
  sectionView: ['configuration'],
  sideView: ['landingGear'],
  topView: ['airframe', 'engineAPU', 'avionics'],
};
