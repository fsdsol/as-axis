export interface IResponseModel {
  Status: number | undefined;
  Title: string | undefined;
  Message: string | undefined;
  Data: any | undefined;
  Meta: any | undefined;
}

export class ResponseModel implements IResponseModel {
  constructor(data?: IResponseModel) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  public Data: any;
  public Message: string | undefined;
  public Status: number | undefined;
  public Title: string | undefined;
  public Meta: any;

  static fromJS(data: any): ResponseModel {
    data = typeof data === 'object' ? data : {};
    const result = new ResponseModel();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.Data = '';
      this.Message = data ? data.Message : '';
      this.Title = data ? data.Title : '';
      this.Status = data ? data.Status : 0;
      this.Meta = '';
    }
  }
}
