

// effects :
// matrix entry and waves
// cane transitions and waving


function loadEffect( name ) {
  switch (name) {
    case 'mtrx': {
      // alert(name);
      MTRX.Init();


    }
      break;
    case 'canes': {
      Canes.Init();
    }
      break;
    default:
  }
}
