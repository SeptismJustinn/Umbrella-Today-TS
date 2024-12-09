import { CoordArray, Fetched } from "common-types";
import React from "react";

export interface DataContextProps {
  data: Fetched.CivilDataseries;
  date: Date;
  coords: CoordArray;
  setCoords: Function;
  outdated: boolean;
  setOutdated: Function;
  loading: boolean;
  setLoading: Function;
}

const DataContext = React.createContext<DataContextProps>({
  data: [],
  date: new Date(),
  coords: [0, 0],
  setCoords: () => {},
  outdated: false,
  setOutdated: () => {},
  loading: true,
  setLoading: () => {},
});

export default DataContext;
