import { Box, Grid, Paper } from "@mui/material";
import CompanyBranding from "../../../components/molecules/CompanyBranding/CompanyBranding";
import AuthenticationForm from "@/components/molecules/AuthenticationForm/AuthenticationForm";
import { useAuthenticationState } from "./state/useAuthenticationState";
import { useAuthenticationStyle } from "./Authentication.style";


const Authentication = () => {
    /* states generales login */
    /*const [userRequest, setUserRequest] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');*/
    const classes = useAuthenticationStyle();
    const { form, loading, error } = useAuthenticationState();
    console.log("AuthenticationContainer-loading: ", loading);
    return (
        <Box sx={{...classes.boxContainer}}>
            <Grid container sx={{...classes.gridContainer}}>
                {/* Lado izquierdo - Branding mejorado */}
                <Grid size={{ xs: 12, md: 6 }} sx={{...classes.brandingContainer}}>
                    <CompanyBranding />
                </Grid>
                {/* Lado derecho - Formulario con diseño premium */}
                <Grid size={{ xs: 12, md: 6 }} sx={{...classes.formContainer}}>
                    {/* Paper container con efectos glassmorphism */}
                    <Paper elevation={0} sx={{...classes.paperContainer}}>
                        {/* Formulario Login */}
                        <form>
                            <AuthenticationForm
                                control={form.control}
                                errors={form.errors}
                                loading={loading}
                                error={error}
                                onSubmit={form.handleOnSubmitLogin}
                            />
                        </form>
                    </Paper>

                    {/* Elementos decorativos flotantes */}
                    <Box sx={{...classes.burbleeAnimationTop}}/>
                    <Box sx={{...classes.burbleeAnimationBottom}}/>
                </Grid>

            </Grid>
        </Box>
    );
}

export default Authentication;