package dev.michelle.users;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointRepository extends MongoRepository<Appointment, ObjectId> {
    
}
