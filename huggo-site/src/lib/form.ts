/**
 * Backend-agnostic form submission handler.
 */

export interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message?: string;
  type: 'merchant' | 'distributor';
  [key: string]: string | undefined;
}

/**
 * Submits form data to the configured endpoint.
 * Reads the endpoint from the PUBLIC_FORM_ENDPOINT env variable,
 * falling back to '/api/contact'.
 */
export async function submitForm(
  data: FormData
): Promise<{ success: boolean; error?: string }> {
  const endpoint = import.meta.env.PUBLIC_FORM_ENDPOINT || '/api/contact';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Submission failed');

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
