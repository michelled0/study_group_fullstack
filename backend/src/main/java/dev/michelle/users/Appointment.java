package dev.michelle.users;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "appointments")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Appointment {
    @Id
    private ObjectId id;

    private String firstLast;
    private String date;
    private String group;
    private String description;

    public Appointment(String firstLast, String date, String group, String description) {
        this.firstLast = firstLast;
        this.date = date;
        this.group = group;
        this.description = description;
    }
}
