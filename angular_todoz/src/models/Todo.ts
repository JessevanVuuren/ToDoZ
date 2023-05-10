export interface ToDo {
  id:            string;
  attributes:    Attributes;
  relationships: Relationships;
}

export interface Attributes {
  name:        string;
  description: string;
  done: number;
  priority:    string;
  created_at:  string;
  updated_at:  string;
}

export interface Relationships {
  id:         string;
  user_name:  string;
  user_email: string;
}