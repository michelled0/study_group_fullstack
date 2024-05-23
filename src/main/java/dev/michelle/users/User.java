package dev.michelle.users;

import java.sql.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private ObjectId userId;
    private String firstLast;
    private String firstName;
    private String lastName;

    @DocumentReference
    private List<Appointment> appointments;

    public User(String firstLast, String firstName, String lastName) {
        this.firstLast = firstLast;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
