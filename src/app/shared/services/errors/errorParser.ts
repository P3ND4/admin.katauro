import { HttpErrorResponse } from "@angular/common/http";

export function parseError(error: HttpErrorResponse): { name: string, error: string } {
    let errorName = error.error.error ?? 'Error';
    let errorMessage = error.error.message ?? 'An unexpected error occurred.';
    if (error.error && error.status === 0) {
        errorName = 'Error de conexión';
        errorMessage = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet y recargue la página';
    }
    if (error.error && error.status === 401) {
        errorName = "No autorizado"
    }
    return { name: errorName, error: errorMessage };
} 