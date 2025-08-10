import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./app/store";

export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected
) => useSelector(selector);

export const useAppDispatch = () => useDispatch<AppDispatch>();
