import React from "react";
import { Grid, TextField, Collapse } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from "react-redux";
import { getCitySelected } from "../store/cityDucks";

const SelectCity = () => {
    const dispatch = useDispatch();

    const citySelected = useSelector(store => store.citySelected.city)
    console.log(citySelected)

    const [countries, setCountries] = React.useState([]);
    const [regions, setRegions] = React.useState([]);
    const [cities, setCities] = React.useState([]);
    const [valueSelectCountries, setValueSelectCountries] = React.useState(null);
    const [valueSelectRegion, setValueSelectRegion] = React.useState(null);
    const [valueSelectCities, setValueSelectCities] = React.useState(null);

    React.useEffect(() => {
        getCountries()
    }, [])

    const getCountries = async () => {
        const data = await fetch("http://battuta.medunes.net/api/country/all/?key=4054b5748b0234da2bdaa69ed27c693c");
        const allCountries = await data.json();
        setCountries(allCountries)
    }

    const getRegions = async (country) => {
        const data = await fetch(`http://battuta.medunes.net/api/region/${country}/all/?key=4054b5748b0234da2bdaa69ed27c693c`);
        const allRegions = await data.json();
        setRegions(allRegions)
    }

    const getCities = async (regionData) => {
        console.log(regionData)
        if(regionData !== null){
        const data = await fetch(`https://battuta.medunes.net/api/city/${regionData.country}/search/?region=${regionData.region}&key=4054b5748b0234da2bdaa69ed27c693c`);
        const allCities = await data.json();
        setCities(allCities)
    } else{ 
        setCities([])
    }
    }

    return (
        <Grid
            container
            justifyContent="center"
            direction="column"
            alignItems="center">
            <Grid>
                <h3>Please choose the country</h3>
                <Autocomplete
                    value={valueSelectCountries}
                    onChange={(event, newValue) => {
                        setValueSelectCountries(newValue);
                        if (newValue !== null) {
                            getRegions(newValue.code)
                        } 
                        console.log(newValue);
                    }}
                    options={countries}
                    getOptionLabel={(option) => option.name}
                    getOptionSelected={(option, value) => true}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} margin="normal" />}
                />
            </Grid>
            <Collapse in={valueSelectCountries !== null ? true : false}>
                <Grid>
                    <h3>Please choose the region</h3>
                    <Autocomplete
                        value={regions.findIndex(item => item === valueSelectRegion) === -1 ? null : valueSelectRegion}
                        onChange={(event, newValue) => {
                            setValueSelectRegion(newValue);
                            getCities(newValue)
                            console.log(newValue);
                        }}
                        onInputChange={(event, newInputValue) => {
                            if(newInputValue === ""){
                            getCities(null)
                            setValueSelectRegion(null);
                            }
                        }}
                        options={regions}
                        getOptionLabel={(option) => option.region}
                        getOptionSelected={(option, value) => true}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} margin="normal" />}
                    />
                </Grid>
            </Collapse>
            <Collapse in={valueSelectRegion !== null ? true : false}>
                <Grid>
                    <h3>Please choose the country</h3>
                    <Autocomplete
                        value={cities.findIndex(item => item === valueSelectCities) !== -1 ? valueSelectCities : null}
                        onChange={(event, newValue) => {
                            setValueSelectCities(newValue);
                            console.log(newValue);
                        }}
                        onInputChange={(event, newInputValue) => {
                            const citySearch = newInputValue.replace(/ /g, "")
                            console.log(citySearch)
                            dispatch(getCitySelected(citySearch))
                        }}
                        options={cities}
                        getOptionLabel={(option) => option.city}
                        getOptionSelected={(option, value) => true}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} margin="normal" />}
                    />
                </Grid>
            </Collapse>
        </Grid>
    )
}

export default SelectCity;