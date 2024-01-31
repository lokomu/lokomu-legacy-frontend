import AxiosInstance, {
  AxiosResponse,
  AxiosRequestConfig,
} from "@/api/AxiosInstance";

class BaseRepository {
  private instance = AxiosInstance;

  async get<T>(url: string, params: Record<string, unknown> = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get<T>(url, {
      params,
    });
    return response.data.payload;
  }

  async post<T>(
    url: string,
    data: Record<string, unknown> = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.post<T>(
      url,
      data,
      config,
    );
    if (response.data && response.data.payload) return response.data.payload;
    return response.data;
  }

  async put<T>(url: string, data: Record<string, unknown> = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.put<T>(url, data);
    if (response.data && response.data) return response.data.payload;
    return response.data;
  }

  async patch<T>(url: string, data: Record<string, unknown> = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.patch<T>(url, data);
    return response.data;
  }

  async delete<T>(
    url: string,
    params: Record<string, unknown> = {},
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete<T>(url, {
      params,
    });
    return response.data;
  }
}

export default BaseRepository;
