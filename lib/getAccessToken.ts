"use server";
import { JWT } from "google-auth-library";
import admin from "firebase-admin";

// Initialize Firebase Admin (optional if you need both)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "learn-english-with-thomas132",
      privateKey:
        "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC3vvV/nV2K/cyN\nF/YrqcvpVWBXaw+QAR4m/QGMxnkAZJKeijtuwxLzLSaPNyeWrh3b6PUqwphU8SgQ\nukrsp4gDCoZO2laCfi1QTcu520HGdEPJ6wFlCBic/RkkRxOPH/dfC6MVrmKCm45/\nOATGjtiwzRbXaXfk/miWSjD2J+7YwzmU12kwcoU4d4YNq2Dc/tCxHN5NiNDnKZZn\nJaPeEYkNf2JJQWLdsnPQs5KxhBfRejLmPgFVz4R5bbhEbwLpIP5/86jvZ4hlBV3i\n6cntKMP1xP2z2stHIE9O6V1GI9yp5LdQRszAwVYxjUpHBv1qM0hcWV2GA4w6aGFz\ns6EKwhRLAgMBAAECggEAOk6d/8dzgiIkkVdbtiJVAy+k+UiPcS5xn4Skw8PNbOr9\nPdL2piC/+CvJMyQY629IKVsExXNnvHikMp6zHOLSvchOs2IElrcscPGm5szlU/Db\n/AyXbjSB/vsvybvGQKIvsNj0APLL7s8nCka/+TQmHgCOsX+V3LRAgwR7AfnNCLps\nfH9TDAMPuY2lw2eONpIokzFY1hgDfCRqs3jltIwZaj1KDLz+CJjgxwZEFZj1hs6m\n2VBT49LN9Dwev79zeLideUUJkrS6Q3vO6B9DStEMRExOuq54Lr0uYj5dCG/pau24\noMuNG1l39wPhUvkSzB0YXEJzeDEAmQCQHMPTehUj5QKBgQDsDbC99IzRCgCSFSLP\nQsKrNbgJfTCRSesNYL8nC+UDcc0GodSN5dnm1pp86C4apNk/gTNFYU1YP62u747+\nl+Zo0cui7F1+TATJTB+f6YMCVX+vgkNTkrqFWtrcFRSCLqX1prbuYXP2RjRcOzL8\ncd9alhj/7Ak+98QefXvythadzQKBgQDHRcBpP987bW5AlHtgnT13yXN3ngrvoS9C\nwY6JA7X3j8jVBAAME+6E3bLmgZ/08SVPQCW7sEd7h9+GaBHWgrNiWAZYjU+jpBIo\n/YASnMbZocpBt8i7oi/e3+1Z3ty5pN5wJAeVEaBv5ckH3JDpiT1dhjS/oOb/HJo9\ncWbt1O+idwKBgFvL3yWfynsoVpx4l7beEXIfS9h01MRLaJslOnDm0UKLqN2hZVVh\nQ2HfpuhYKkW2Qb3Ocq/SbQ+ag+J5yrP7QmEU5QoQvTL2QQ4/CjVXy9jGgwcvsxr2\n/o4JjP71O6p8lZF4Kb9+KmhlWMtdQjCl3+QMZuBvXBEerSfmSKNUaGspAoGAHwLc\n4cQ94kqyaLxywuNViInCPXBL9WTZLQNgQjRgoikvMO9Rbo+/g8/YooSztvO8QawS\n8zWIulG32HvjosVuUzStsCQ1q5rB9L0WrE7Xp1DFYBrQ01p3JrEkh+Ll6MIel8cT\nowA+Pou9EEskBiQEd8SF+vh4WmVCH6PBR+vmaxsCgYATfkaNbJdzMopsPBRzJXgE\nhLDtNcODdM9NuxFHaYG0YcmSu6GFBikk1VowQlo3+HAadwT4+FUquKvd2gfGADIB\nOO4E/uiLppgSWidpAdtRMsJp7QuDsJod6sJnLR3WiLZWzWkWBkHOCrhilwVNmaC9\n3R+UJDmR3WqmnN3AhrjluQ",
      clientEmail:
        "firebase-adminsdk-woiyh@learn-english-with-thomas132.iam.gserviceaccount.com",
    }),
  });
}

export async function getAccessToken() {
  try {
    const serviceAccount = {
      type: "service_account",
      project_id: "learn-english-with-thomas132",
      private_key_id: "3d22bc4d78d108583208ffa04602717df4392f56",
      private_key:
        "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC3vvV/nV2K/cyN\nF/YrqcvpVWBXaw+QAR4m/QGMxnkAZJKeijtuwxLzLSaPNyeWrh3b6PUqwphU8SgQ\nukrsp4gDCoZO2laCfi1QTcu520HGdEPJ6wFlCBic/RkkRxOPH/dfC6MVrmKCm45/\nOATGjtiwzRbXaXfk/miWSjD2J+7YwzmU12kwcoU4d4YNq2Dc/tCxHN5NiNDnKZZn\nJaPeEYkNf2JJQWLdsnPQs5KxhBfRejLmPgFVz4R5bbhEbwLpIP5/86jvZ4hlBV3i\n6cntKMP1xP2z2stHIE9O6V1GI9yp5LdQRszAwVYxjUpHBv1qM0hcWV2GA4w6aGFz\ns6EKwhRLAgMBAAECggEAOk6d/8dzgiIkkVdbtiJVAy+k+UiPcS5xn4Skw8PNbOr9\nPdL2piC/+CvJMyQY629IKVsExXNnvHikMp6zHOLSvchOs2IElrcscPGm5szlU/Db\n/AyXbjSB/vsvybvGQKIvsNj0APLL7s8nCka/+TQmHgCOsX+V3LRAgwR7AfnNCLps\nfH9TDAMPuY2lw2eONpIokzFY1hgDfCRqs3jltIwZaj1KDLz+CJjgxwZEFZj1hs6m\n2VBT49LN9Dwev79zeLideUUJkrS6Q3vO6B9DStEMRExOuq54Lr0uYj5dCG/pau24\noMuNG1l39wPhUvkSzB0YXEJzeDEAmQCQHMPTehUj5QKBgQDsDbC99IzRCgCSFSLP\nQsKrNbgJfTCRSesNYL8nC+UDcc0GodSN5dnm1pp86C4apNk/gTNFYU1YP62u747+\nl+Zo0cui7F1+TATJTB+f6YMCVX+vgkNTkrqFWtrcFRSCLqX1prbuYXP2RjRcOzL8\ncd9alhj/7Ak+98QefXvythadzQKBgQDHRcBpP987bW5AlHtgnT13yXN3ngrvoS9C\nwY6JA7X3j8jVBAAME+6E3bLmgZ/08SVPQCW7sEd7h9+GaBHWgrNiWAZYjU+jpBIo\n/YASnMbZocpBt8i7oi/e3+1Z3ty5pN5wJAeVEaBv5ckH3JDpiT1dhjS/oOb/HJo9\ncWbt1O+idwKBgFvL3yWfynsoVpx4l7beEXIfS9h01MRLaJslOnDm0UKLqN2hZVVh\nQ2HfpuhYKkW2Qb3Ocq/SbQ+ag+J5yrP7QmEU5QoQvTL2QQ4/CjVXy9jGgwcvsxr2\n/o4JjP71O6p8lZF4Kb9+KmhlWMtdQjCl3+QMZuBvXBEerSfmSKNUaGspAoGAHwLc\n4cQ94kqyaLxywuNViInCPXBL9WTZLQNgQjRgoikvMO9Rbo+/g8/YooSztvO8QawS\n8zWIulG32HvjosVuUzStsCQ1q5rB9L0WrE7Xp1DFYBrQ01p3JrEkh+Ll6MIel8cT\nowA+Pou9EEskBiQEd8SF+vh4WmVCH6PBR+vmaxsCgYATfkaNbJdzMopsPBRzJXgE\nhLDtNcODdM9NuxFHaYG0YcmSu6GFBikk1VowQlo3+HAadwT4+FUquKvd2gfGADIB\nOO4E/uiLppgSWidpAdtRMsJp7QuDsJod6sJnLR3WiLZWzWkWBkHOCrhilwVNmaC9\n3R+UJDmR3WqmnN3AhrjluQ",
      client_email:
        "firebase-adminsdk-woiyh@learn-english-with-thomas132.iam.gserviceaccount.com",
      client_id: "100165925193924436582",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      universe_domain: "googleapis.com",
    };

    const scopes = ["https://www.googleapis.com/auth/firebase.messaging"];

    const jwtClient = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: scopes,
    });

    const credentials = await jwtClient.authorize();
    return credentials.access_token;
  } catch (error) {
    console.error("Error obtaining access token:", error);
    throw error;
  }
}
